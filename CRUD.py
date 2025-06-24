from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)


#  Create Database & Table

# Connect to database
conn = sqlite3.connect('mycollege.db')  # Fixed typo in file name

# Create a cursor object
cur = conn.cursor()

# Check if table exists
cur.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='student'")
if cur.fetchone()[0] == 1:  # Fixed typo: fetchhone → fetchone
    print("Table Already Exists")
else:
    conn.execute("CREATE TABLE student (name TEXT, addr TEXT, city TEXT, pin TEXT)")
    print("Table Created")

# Close connection
conn.close()






# Insert data to Table

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/addStudent')
def add_student():  
    return render_template('add_student.html')

@app.route('/saveStudent', methods=['GET', 'POST']) 
def save_student():
    msg = ""
    if request.method == 'POST':  
        try:
            name = request.form.get('studname')
            addr = request.form.get('studaddr')
            city = request.form.get('studcity')
            pin = request.form.get('studpin')

            with sqlite3.connect('mycollege.db') as conn:
                cur = conn.cursor()
                cur.execute("INSERT INTO student (name, addr, city, pin) VALUES (?, ?, ?, ?)", (name, addr, city, pin))  # ✅ Fixed: removed extra comma and fixed VALUES
                conn.commit()   
                msg = "Data Inserted Successfully"
        except Exception as e:
            conn.rollback()
            msg = f"Could not insert data. Error: {e}"

    return render_template('success.html', msg=msg)  










# Read Data

@app.route('/listStudent')
def list_student():  
    conn = sqlite3.connect("mycollege.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("SELECT * FROM student")
    rows = cur.fetchall()
    return render_template('view.html',rows=rows)








# Update Data

@app.route('/updateInput')
def update_input():
    return render_template('update_input.html')

@app.route('/updateStudent', methods=['POST'])
def update_student():
    stud_name = request.form.get('txtname')
    stud_city = request.form.get('txtcity')
    stud_addr = request.form.get('txtaddr')
    stud_pin = request.form.get('txtpin')

    msg = ''
    try:
        with sqlite3.connect('mycollege.db') as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE student SET city = ?, addr = ?, pin = ? WHERE name = ?", (stud_city, stud_addr, stud_pin, stud_name))
            conn.commit()
            msg = f"Total Rows Affected: {conn.total_changes}"
    except Exception as e:
        msg = f"Could not update records. Error: {str(e)}"
    return render_template('success.html', msg=msg)






#  Delete Data

@app.route('/deleteInput')
def delete_input():
    return render_template('delete_input.html')

@app.route('/deleteStudent', methods=['POST'])
def delete_student():
    stud_name = request.form.get('txtname')
    msg = ''
    try:
        with sqlite3.connect('mycollege.db') as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM student WHERE name = ?", (stud_name,))
            conn.commit()
            msg = f"Total Rows Deleted: {conn.total_changes}"
    except Exception as e:
        msg = f"Could not delete records. Error: {str(e)}"
    return render_template('success.html', msg=msg)



if __name__ == "__main__":
    app.run(debug=True)





