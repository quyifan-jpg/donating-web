# team02
We use react in our project.
Run: "npm install" and then "npm start" to begin

**instead seller sells their furniture, the web allows users to post furiniture and donate them** 
**By this website, when users move to new place, they could dispose their furniture faster and don't need to pay disposal fee**
**Other users could browse posts and contact with donor via phone number**

There are multiple users in our project.
We have already set 4 users in our project.
We only allow users use Username and Password to login.

Username:admin Password:admin 

Username:user1 Password:user1 owns item 1 2

Username:user2 Password:user2 owns item 3 4 5 6

Username:user3 Password:user3 owns item 7 8

First, you can see the navigation bar on the top of our webpage. This navigation bar will always appear on the top of our webpages.
you can click "home" button in any pages, and you will return to the home page.

The button "What are you looking for" is search box, you can search the name of items, the middle "Item to browse" will change items to match your search automatically. 

You can also register for new users such as user4, user5, ...etc...(all new register user will be normal users. i.e. not admin user SINCE there is only one admin user)
When new user register, the password and repeat password must be same and username must be different from any other users and not Null, otherwise you cannot register(Register button is disabled.)
New user will store temporarily in webpage(state in App.js).

You can login for registered users. Your username must have already existed and password must be correct. Otherwise, you cannot login(Login button is disabled.)
After you login, there will be 2 buttons appears on the right side of the "Login User Info"(One is your login username; the other is your logout), and button Login will disappear. 
You can only login again after you click logout button. After you click logout button, these 2 buttons will disappear and login button will appear.
We will save login user all the time except you click logout button.

You can change your password, email, phone number after you login when you click button on the right side of "Login User Info" on navigation bar and click button "Change your info".
In this page, you can change you info such as password, email and phone number. We only check password again when you wish to change your password. 
The old password must be same as your current password and your new password must be different.
Also, if you logout in this page, all three buttons will be disabled.
(Since we don't allow guest to change anything. But you can change after you login again and the login user can be different. Perhaps someone have 2 or more accounts.)
Also, when you browse any information of other users, the "Change you info" will disappear.(Since you cannot change other information.)

You can view category on the left bar and publish new item on the right bar.
For your items, you could delete the post, and admin could delete any item and notify their owner. 
On the right bar, Only when you complete all 5 information and you have already login, you can click "Publish new furniture" button. And new item will be added into the middle "Item to browse".
Also, if you only complete 5 information and didn't login, the button will be disabled.

You can also click "Like" button, then item will be in your Likes page, and could also click "unlike" to remove it from the "like". When the item the you likes is deleted or the admin removes its owner, you would get different notification on "Notice" page.






 