# INSTALLATION GUIDE 
## Getting the VPS and creating an instance
1. Search up AWS create account and open the website.
2. Click the create an account for AWS so we can use the vps later.
3. Once on your AWS account in the searchbar type in Lightsail to use amazon Lightsail.
4. Then you press create instance.
5. You choose your platform first in our case linux.
6. Then you choose your OS at select a blueprint, click Operating System (OS) only.
7. Then choose Debian 12.8 or any version that you want.
8. Create an SSH key for the instance that you are launching.
9. Make sure to save the key in a folder so you know where to find it. (Make a ssh key folder and pick a suitable name like UnixSSHKeyLightsail).
10. For the network type we used dual stack.
11. Then for the instance plan we choose the 5$ a month plan since we do not need anymore for a project of this scale.
12. Then for the instance name pick a name that you see as fitting for the project.
13. Click create instance, then your instance will be created.

## Setting up the domain
1. Search up Ionos
2. In the search bar that says find your domain now, type in the domain name that you would like for your website. The site will let you know if the name is available.
3. Then you would press add to cart.
4. Then you will be on a new page that will put you through the purchasing process of the domain. On the your selection page click Domain Only.
5. Then for the rest just fill out the details so you can purchase the domain name.
6. After your purchase you will get an email and you can set up your domain to do what you want it to.
7. Then we will need to go back on to AWS lightsail so we can create a static IP.
8. When AWS lightsail is open click on the networking tab and after click the create static IP option.
9. Then you will have to connect the static IP to an instance, pick the instance you created in part 1.
10. Before you confirm everything make sure the instance you have on lightsail is currently running orelse the static IP will not be assigned to the instance since it is not running.
11. Once all this is done then you can create your static IP.
12. Then we go back to our Ionos account, and we open the domain we just purchased.
13. Then we click on the DNS tab and click add record.
14. Then we click A which is for an IPv4 address (The static IP we just created).
15. Then inside the Points to text box we write our static IP address we got from Lightsail, then we click save.

## Cloning the repository for the website onto your VPS
```bash
git clone <url of your repository>
```
## Setting up Nginx to display our website
1. Open up the terminal for the lightsail instance on aws. You can just press the connect using SSH button.
2. Then we will be put in the terminal, the first thing we do is install nginx and type the command: (sudo apt install nginx -y)
3. Then the next two commands we do so we can start nginx and make sure it starts on boot are:
```bash
sudo systemctl start nginx

sudo systemctl enable nginx
```
4. After we do these commands, what's in parentheses is not part of the code just an explantion from us on how to use the commands properly:
```bash
sudo mkdir -p /var/www/yourdomain.com/html

# (-p makes it so parent directories are created if they don't yet exist. yourdomain.com, replace this with your actual domain name)

sudo cp -r /path/to/your/website/files/* /var/www/yourdomain.com/html/

# (-r copies all files recusively and the ones in subfolders. 
# Then you write down the path to where the files for your website are stored and copy them to the directory we just made earlier.)

sudo chown -R www-data:www-data /var/www/yourdomain.com

# (-R recursively applies this to all the files and directories in the domain.
# We change the ownership to of the files to the www-data user and group.
# www-data is the default user nginx web server runs as.
# You change ownership to www-data to make sure Nginx can access and serve the files.)
```
Make sure that the path is the one to your repository you want to autodeploy

5. Next we need to make a config file so we type in the following commands:
```bash
sudo nano /etc/nginx/sites-available/yourdomain.com

# (Inside the file we nano, make sure you replace the yourdomain.com with your actual domain)

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/yourdomain.com/html;
    index index.html; 

    location / {
        try_files $uri $uri/ =404;
    }
}
```
6. We type this command to enable the site then we reload nginx
```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/

sudo systemctl reload nginx
```
7. Search up the domain to see if your website works.

8. Optional you can add these commands if you want to secure your site.
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx
```
## Setting Up a Cron Job for Auto Deployment

### 1. Create a Bash Script to Pull Latest Changes and Restart Nginx
1. Create the script:

```bash
sudo nano /usr/local/bin/update_website.sh

#!/bin/bash

# Navigate to the website directory
cd /var/www/unix-project.com

# Pull the latest changes from the Git repository
/usr/bin/git pull origin main

# Restart Nginx to serve the updated files
/usr/sbin/service nginx restart
```
2. Make the script executable
   
```bash
sudo chmod +x /usr/local/bin/update_website.sh

```
3. Set Up Cron Job to Run the Script Every Minute
   
```bash

crontab -e
#Add the following line to check the website every minute:

* * * * * /usr/local/bin/update_website.sh >> /var/log/cron_job.log 2>&1

```

4. Set Up UFW Firewall
Install UFW (if it's not already installed):

```bash

sudo apt install ufw
```
5. Allow necessary ports (HTTP, HTTPS, and SSH):

```bash

sudo ufw allow 22  # SSH
sudo ufw allow 80  # HTTP
sudo ufw allow 443 # HTTPS
```
Enable UFW firewall:

```bash

sudo ufw enable
```
6. Check the status of the firewall to confirm it's active:

```bash
sudo ufw status
```

### Setting Up SSH Access from Local Machine to VPS (Password-less Login)

#### 1. Generate SSH Key Pair on Local Machine

1\. On your local machine, open a terminal and generate an SSH key pair:

```bash

ssh-keygen
```

2\. Copy the Public Key to the VPS

Copy the generated public key to your VPS using the ssh-copy-id command. Replace username with the name of the user on the VPS and your_server_ip with the IP address of your VPS:

```bash

ssh-copy-id username@your_server_ip
```
If prompted, enter the password for the username on the VPS.

3\. Verify the SSH Key Authentication

After copying the public key, test the SSH login by running:

```bash

ssh username@your_server_ip
```
You should now be able to log in to the VPS without being prompted for a password.

4\. Disable Password Authentication on the VPS for Security

SSH into your VPS:

```bash

ssh username@your_server_ip
```
Open the SSH configuration file to disable password authentication:

```bash
sudo nano /etc/ssh/sshd_config
```
Find the line that says #PasswordAuthentication yes and change it to:

```bash

PasswordAuthentication no
```

Restart the SSH service for the changes to take effect:

```bash
sudo systemctl restart ssh
```

5\. Test SSH Access Again (Password-less Login Only)

Test the connection again from your local machine:

```bash

ssh username@your_server_ip
```
You should now be able to access the VPS using SSH without a password prompt, and password-based SSH login will be disabled for security.


