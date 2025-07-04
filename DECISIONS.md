## Choice 1: Web Hosting Service

The first choice that we had to make is to choose which web hosting service that we will use. We are looking at three different options: **AWS**, **Gratis VPS**, and **Digital Ocean**.

### AWS:

#### Amazon Lightsail:

**PROS:**
- Very user friendly UI.
- They have many options for picking linux OS for the servers and you have options with os plus applications.
- Very easy to follow setup and launch an instance.
- No ads.
- Lots of options.
- On google it says Lightsail is cheaper than EC2.
- The AI overview when I googled "difference between ec2 and lightsail" says:  
  *"Lightsail is a simpler, easier-to-use platform, ideal for beginners or those with straightforward needs."*  
  This is very beneficial to us since it is our first time using these services. So a simpler more user friendly platform would help us.
- Our needs are not very complicated since all we need to do is host a website on a VPS.

**CONS:**
- They have a free version available for 3 months 750 hours a month limit. A lot less than the 12 months that you get from EC2.

---

#### Amazon EC2:

**PROS:**
- They have a free version available for 12 months.
- Very user friendly UI.
- They have many options for picking linux OS for the server such as (Amazon linux, macOS, Ubuntu, Windows, Red Hat, SUSE Linux, Debian).
- No ads.
- Lots of options.

**CONS:**
- Not as easy to follow setup and launch an instance when compared to amazon Lightsail.
- On google it says Lightsail is cheaper than EC2.
- The AI overview when I googled "difference between ec2 and lightsail" says:  
  *EC2 offers greater flexibility, control, and a wider range of instance types, making it suitable for more complex or demanding workloads.*  
  This is a con for us because in this case we are the beginners and do not need the extra flexibility and control that the EC2 offers.

---

### Gratis VPS:

**PROS:**
- It is completely free and is a useful tool for business that are small to medium scale.

**CONS:**
- The Free VPS is intended for educational, developmental, and testing purposes only, so if you are looking for a free VPS as a business you will not be able to use this.
- Very sketchy, might be a scam, tried starting the vps and I got some pop ups that made seem like it was a scam.
- We will not be using this product. Very inconvient to use.
- We do not even know if the payed elements work.

---

After trying out these various options the simplest one to use is **Amazon Lightsail**.  
We will definetly not use Gratis VPS since it might work however it looks sketchy, and it is possible that it works however there is so many complication it is not even worth using when Amazon has free trials that suit our needs for the project.  
Both the 3 month Lightsail, and the 12 month EC2 is more than a long enough duration to meet our needs.  
We are more likely to select **Amazon Lightsail**, since it is beginner friendly and easier to use then EC2. However we might try out EC2 to see the difference between the two then we will determine which one we like more.  
Lastly we can say that from how it looks now considering the simple needs of our project and us being beginners we are more likely to favour Amazon Lightsail.

---

## Choice 2: Picking a Domain Name - Ionos vs Aws Route 53


### Ionos
**Pros:**
- They had a deal where I can get my 1st year with the domain name for 1$, which is more then enough time for us.
- User Friendly interface
- Easy to use

**Cons:**
- What we purchased definetly has less features then what Amazon Lightsail can do.

### Route 53
**Pros:**
- It has a lot of features on it, you will have more options
- Easy to use with Aws since everything is on the same site.

**Cons:**
- Less user friendly
- It cost more for the first year.

The decision we came to here was Ionos, mainly was for the price however it seems to be more beginner friendly then Route 53 that we had seen a video about.

## Choice 3: Web Server – Nginx vs. Apache

For our project, we considered two main web server options: **Nginx** and **Apache**.

---

### Nginx

**Pros:**
- Nginx is lightweight and fast.
- It’s efficient for deploying static content, which makes it ideal for the kind of website we're building.
- It’s used by modern web applications. For example, Netflix uses Nginx.
- It’s simple to set up. We’ve already worked with Nginx in our lab sessions this semester, so we’re more comfortable using it.

**Cons:**
- Nginx isn’t the best option for dynamic content (like PHP processing). However, this isn’t a problem for us because we’re planning to deploy a static website.

---

### Apache

**Pros:**
- Apache is great for dynamic websites and works very well with PHP.
- It handles complex server-side communication well.

**Cons:**
- Apache is not as fast as Nginx, especially when serving static content.
- It uses more system resources.
- We’re less familiar with Apache, so using it might slow down our progress.

---

### Conclusion

Since we’re deploying a static website and want something fast, simple, and familiar, **Nginx is the better fit** for our project.

## Choice 4: Auto-Deployment Method – Webhooks vs. Cron Jobs

As part of our deployment strategy, we needed a way to automatically update our website whenever we pushed changes to GitHub. Two main methods we considered were **GitHub Webhooks** and **Cron Jobs**.

---

### Webhooks

**Pros:**
- Real-time updates. Changes pushed to GitHub can instantly trigger a deployment.
- Professional and scalable. This is how many CI/CD pipelines work.
- Great long-term solution for larger or constantly updated projects.

**Cons:**
- More complicated to set up. Requires configuring a webhook listener or CI/CD tool like GitHub Actions, Jenkins, or a custom script running on a port.
- Potential security concerns if the webhook is not properly secured.

---

### Cron Job

**Pros:**
- Simple to set up. We just need to schedule a recurring task using `crontab`.
- Pulls the latest changes from the GitHub repo at regular intervals (e.g., every minute).
- Works well for our use case since the site doesn’t need instant updates.

**Cons:**
- Not real-time. There’s a slight delay between making changes and seeing them live.
- Pulling when there are no changes can create unnecessary overhead.

---

### Conclusion

We chose **cron jobs** because of their simplicity. For a student project like ours, we didn’t need the complexity of webhooks or full CI/CD. A basic cron job that pulls the latest changes and restarts the Nginx service every minute works perfectly.

Here’s our cron job:
 ```bash
* * * * * cd /var/www/unix-project.com && git pull origin main && sudo service nginx restart >> /var/log/cron_job.log 2>&1
  ```
