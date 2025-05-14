# Unix Project – VPS Website with Automatic GitHub Updates

## Overview

**Project Description:**  
We set up a VPS to host a website that automatically updates whenever code is pushed to GitHub. This project builds a secure and reliable environment by:

- Setting up key-based SSH login
- Automating website deployment using cron jobs
- Managing the server and firewall using best practices
- Ensuring secure access via UFW and SSH configuration

## Features

- Hosting a static website on a VPS
- Automatic deployment with `git pull` and Nginx restart
- Cron job that checks for updates every minute
- UFW firewall setup to allow only essential ports (SSH, HTTP, HTTPS)
- Key-based SSH authentication (no password login)
- Separate user account for secure access

## Setup Outline

1. Create and configure a VPS instance (e.g., AWS Lightsail)
2. Install and configure Nginx web server
3. Clone GitHub repository inside the VPS
4. Create a bash script to:
   - Pull the latest code from GitHub
   - Restart the Nginx server
5. Create a cron job to run the script every minute
6. Set up UFW
7. Generate and install SSH keys for password-less login
8. Create a new user and grant sudo access
9. Secure the VPS by using `.ssh/authorized_keys` and limiting root access

## Team Members

- **Luis Angelo Primero**
- **Sean Lussier**
- **Abdulmajeed Kakar**
