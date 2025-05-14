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

## Setting up Nginx to display our website
1. Open up the terminal for the lightsail instance on aws. You can just press the connect using SSH button.
2. Then we will be put in the terminal, the first thing we do is install nginx and type the command: (sudo apt install nginx -y)
3. Then the next two commands we do so we can start nginx and make sure it starts on boot are:

sudo systemctl start nginx

sudo systemctl enable nginx

4. After we do these commands, what's in parentheses is not part of the code just an explantion from us on how to use the commands properly:

sudo mkdir -p /var/www/yourdomain.com/html (-p makes it so parent directories are created if they don't yet exist. yourdomain.com, replace this with your actual domain name)

sudo cp -r /path/to/your/website/files/* /var/www/yourdomain.com/html/ (-r copies all files recusively and the ones in subfolders. 
Then you write down the to where the files for your website are stored and copy them to the directory we just made earlier.)

sudo chown -R www-data:www-data /var/www/yourdomain.com (-R recursively applies this to all the files and directories in the domain. We change the ownership to of the files to the www-data user and group. www-data is the default user nginx web server runs as. You change ownership to www-data to make sure Nginx can access and serve the files.)

5. Next we need to make a config file so we type in the following commands:

sudo nano /etc/nginx/sites-available/yourdomain.com

(Inside the file we nano, make sure you replace the yourdomain.com with your actual domain)

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/yourdomain.com/html;
    index index.html; 

    location / {
        try_files $uri $uri/ =404;
    }
}

6. We type this command to enable the site then we reload nginx

sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/

sudo systemctl reload nginx

7. Search up the domain to see if your website works.

8. Optional you can add these commands if you to secure your site

sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx

Next week plan: Remove this Majeed when you finish up because there is no more next week plan
- figure out how to make automatic backups 
- install required packages
