[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/c1cqHQ5R)

📝 คู่มือการทดสอบระบบ (Testing Guide)
ขั้นตอนการรัน Test Case สำหรับโปรเจกต์ โดยใช้ Newman เป็นเครื่องมือในการรัน Postman Collection

🚀 คำสั่งสำหรับรันการทดสอบ (Execution Command)
ปัจจุบันระบบถูกตั้งค่าให้รันเฉพาะชุดทดสอบที่ 5 (test5.json) โดยใช้คำสั่งดังนี้:


newman run test5.json -e env.json

📋 ข้อมูลที่ต้องเตรียมในฐานข้อมูล (Prerequisites)
ก่อนเริ่มทำการทดสอบ จำเป็น ต้องทำการลงทะเบียน (Register) ผู้ใช้งานในฐานข้อมูลให้เรียบร้อยตามข้อมูลด้านล่างนี้ เพื่อให้ชุดทดสอบสามารถทำงานได้อย่างถูกต้อง:

1. ผู้ใช้งานระดับผู้ดูแลระบบ (Admin Role)
Email: admin9@gmail.com

Password: 12345678

Role: admin

2. ผู้ใช้งานระดับทั่วไป (User Role)
Email: first2@gmail.com

Password: 12345678

Role: user
