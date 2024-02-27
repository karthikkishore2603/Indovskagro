import firebase_admin
from firebase_admin import credentials, auth

# set accordingly
cred = credentials.Certificate(
    r"D:\karthik-project\indovskagro-firebase-adminsdk-onfbj-eadd029cb1.json"
)
app = firebase_admin.initialize_app(cred)

# set custom roles for users
EMAIL = "karthikkishore2603@gmail.com"


def set_custom_claims(email, claim="admin"):
    user = auth.get_user_by_email(email)
    if not user:
        raise Exception(f"User not found: {email}")

    # set custom claims
    auth.set_custom_user_claims(user.uid, {claim: True})
    print(f"Custom claim {claim} set for user {email}: {user.uid}")

    # verify custom claims
    user = auth.get_user(user.uid)
    print(user.custom_claims)
    print(f"Custom claim {claim} verified for user {email}: {user.uid}")


if __name__ == "__main__":
    set_custom_claims(EMAIL)
