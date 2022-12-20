# Project-Online-Catalog
Database and OOP Project
```
#install 
            frontend
    --------------------------
    1.Install extension Angular Language Service
    2.Install extension Angular Snippets(Version 13)
    3.cd (copy path folder frontend)
    4.npm i -g @angular/cli

    ----restart----
    5.cd (copy path folder frontend)
    6.ng serve
    หากมีerror ในขั้นตอนที่ 6 https://www.c-sharpcorner.com/article/how-to-fix-ps1-can-not-be-loaded-because-running-scripts-is-disabled-on-this-sys/
    --------------------------



            backend
    ---------------------------
    1.cd (copy path folder backend)
    2.npm i
    3.create database nodejs_crud;  (mysql)
    4.ใช้โค้ดใน Project-Online-Catalog\backend\database\db_schma.sql เพื่อสร้าง table
    5.npm run dev
    หากมีerror ในขั้นตอนที่ 5 ให้เปลี่ยนรหัสผ่านของ loaclhost เป็น root โดยรันใน mysql
            ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
            
        ลองรันอีกครั้ง
    ----------------------------

    หากสำเร็จทุกขั้นตอนแล้ว สามารถเข้าได้ที่ http://localhost:4200/

```