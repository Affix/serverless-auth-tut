import sys
import logging
import pymysql
import string
import random
import hashlib

# rds settings
rds_host = "rds-instance-endpoint"
name = "kscotservereless"
password = "as3cur3p4ss"
db_name = "lambda"

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except:
    logger.error("ERROR: Unexpected error: Could not connect to RDS")
    sys.exit()

logger.info("SUCCESS: Connection to RDS succeeded")


def handler(event, context):
    """
    create a user in our RDS Instance
    """

    try:
        print event
        with conn.cursor() as cur:
            salt = generate_salt()
            salted = encrypt_password(event['password'], salt)
            sql = "INSERT INTO `users` (`email`, `password`, `salt`) VALUES (%s, %s, %s)"
            cur.execute(sql, (event['email'], salted, salt))
        conn.commit()
        return "{statusCode: 200, message: 'User created succesfully'}"
    except pymysql.DataError as e:
        logger.error("Error : %s" % e.message)
        return "{statusCode: 500, message: 'Duplicate Entry'}"


def generate_salt():
    """
    generate a random string to act as a salt
    """
    return ''.join(random.choice(string.ascii_uppercase) for _ in range(12))

def encrypt_password(password, salt):
    m = hashlib.sha256()
    m.update(password + salt)
    hashed = m.hexdigest()
    return hashed
