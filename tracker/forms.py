from flask.ext.wtf import Form
from wtforms.fields import TextField
from wtforms.validators import DataRequired

class LoginForm(Form):
    email = TextField('email', validators=[DataRequired()])
    password = TextField('password', validators=[DataRequired()])
