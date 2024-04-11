# WebGUI

This repository was developed for the fall 2023 M2I expo. It relies on Node.js, Angular, Nginx, and Docker. If you do not have experience in these areas and wish to use this code, I recommend watching videos to get a solid understanding.

## How To Use
There are many different ways to host the web server:
1. Run the `docker-compose`
2. Run a container from the `web/Dockerfile`
3. Run `ng serve` inside `web/`

Then open the webpage. If it ever disconnects from the robot, just refresh the page.

## If you are new to Docker, here is a more detailed startup process for Windows 
1. First download Docker from: https://www.docker.com/products/docker-desktop/ 
2. Download the WebGUI code from the Github repository 
3. Open a cmd window 
4. Navigate to the WebGUI folder using the terminal, if it is in your downloads folder type this: cd Downloads/WebGUI-main/WebGUI-main 
5. While docker is running, type docker-compose up –d 
6. Type localhost into your internet browser to view stream and GUI 
7. When you want to shutdown, type docker-compose down 
8. Make sure to shutdown Docker when you are done as it takes significant computer resources 
9. To open the GUI again, you can either repeat the above step 3-8, or you can launch it in Docker Desktop by clicking the play button in the images section, make sure to type in port 80 in the drop down menu 
10. To shutdown the GUI press delete in the Containers section 
