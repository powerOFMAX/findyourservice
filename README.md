# Find Your Service - Laravel application
This project is a basic demo for Brave New Tech using Laravel.

## Requirements
PHP 7.1.3 or Higher,
Composer,
Any Database (I used MySQL),
Web Server ( I used XAMPP) 


## Setting up the Demo
First, clone the repository or download it as a zip, make sure that you're on the right branch. The completed version is in the master branch.
To clone use this command: 

```
git clone https://github.com/powerOFMAX/findyourservice.git
```
I used XAMPP 3.2.2 as a server, but you can use wherever you want. 
Also, I set a local host with the “findyourservice.com.devel” domain. Make sure to do this too, to avoid any problem.

Then, put this commands:

```
cd firstlaravel

cp .env.example .env

composer install
```
Next, create your DataBase and setup the .env file.
Once you are done with that use this command to migrate and seed:

```
php artisan migrate –-seed
```
And that’s all! 
By default, you don’t have an account created, feel free to create one at the register section.

