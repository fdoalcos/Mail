# MAIL SERVICE WEB APP

This project acts like Gmail that is a web-based email service that allows users to send and receive emails. This project is build with Django data server where it used models to integrate data better and the way the data was communicated in this projects is through the implementation of REST API that used client-side programming language (JavaScript) to make it much faster for the users of this project

## Built with

- #### Python Django (Server Side)
    - Used the concept of MVC (model-view-controller) where I used model for its data integration, view for its static templates such as HTML and CSS, and controller where it handles its data and manipulate it correctly


- #### JavaScript (Client Side)
    - This language allowed me to communicate with the server-side (Django) using REST APIs to make it more faster because it won't load once the data has been created so it is good for client-side

- #### HTML
    - This markup language helped its overall structure

- #### CSS
    - This markup language helped its design on the HTML

- #### SCSS
    - Used CSS framework to make my CSS more organized

- #### Bootstrap
    - Used this framework to make my web page more responsive

## Features of the project

- Register
- Log In
- Send Mail
- View Email
- Archive and Unarchive
- Reply


## Let's get started!

## Register
- Before going to the main page, users should be able to register first
- Used Django's built in form models to create a registration for users

![Untitled design](https://user-images.githubusercontent.com/98495736/208226128-fde81e2a-bb37-40d8-861a-c63cf435813a.png)


## Login
- If user already existed then you can choose to Login
- This function would only let the user go in with right username and password else will give an error validation




## Send Mail
- When a user submits the email composition form, the form will send a POST request to the server to actually send the email.
- After sending form, it will redirect to the Sent Mailbox to let the user know that it successfuly send an email to the user.
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## View Mail
- When a user clicks on an email, the user will be taken to the view email where users see the content of that email such as name of the sender, time it send, etc.
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Archive and Unarchive
- Allow users to archive and unarchive emails that they have received.
- when a button is click, it will do its function method which is to archive or unarchive an inbox
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Reply
- Allow users to reply to an email.
- Used POST request to send another request to data and put the data that will let both users to interact with each other
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Future Features
- Allow users to reply to an email.
- Used POST request to send another request to data and put the data that will let both users to interact with each other
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)



## Implementation
- ## Models
    - Model data for sending or geting the Email Inbox
    ```
    class Email(models.Model):
        user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="emails")
        recipients = models.ManyToManyField("User", related_name="emails_received")
        sender = models.ForeignKey("User", on_delete=models.PROTECT, related_name="emails_sent")
        subject = models.CharField(max_length=255)
        body = models.TextField(blank=True)
        timestamp = models.DateTimeField(auto_now_add=True)
        read = models.BooleanField(default=False)
        archived = models.BooleanField(default=False)

        def serialize(self):
            return {
                "id": self.id,
                "sender": self.sender.email,
                "recipients": [user.email for user in self.recipients.all()],
                "subject": self.subject,
                "body": self.body,
                "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
                "read": self.read,
                "archived": self.archived
            }

    ```
- ## Views
    - These are the static web pages such as HTML and CSS
    ![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
   
    - Sample code fragment for sending an email to users using JavaScript
    ```
    function send_email() {
        fetch('/emails', {
            method: 'POST',
            body: JSON.stringify({
            recipients: document.querySelector('#compose-recipients').value,
            subject: document.querySelector('#compose-subject').value,
            body: document.querySelector('#compose-body').value
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('This is the data', data)
        })
        load_mailbox('sent');
        return false;
        }

    ```
- ## Controller
    - This is the part for controlling data or the Backend and more functionalities written on Python
    - Sample code fragments for it, specifically for register and login
    ```
        def login_view(request):
            if request.method == "POST":

                # Attempt to sign user in
                email = request.POST["email"]
                password = request.POST["password"]
                user = authenticate(request, username=email, password=password)

                # Check if authentication successful
                if user is not None:
                    login(request, user)
                    return HttpResponseRedirect(reverse("index"))
                else:
                    return render(request, "mail/login.html", {
                        "message": "Invalid email and/or password."
                    })
            else:
                return render(request, "mail/login.html")


        def register(request):
            if request.method == "POST":
                email = request.POST["email"]

                # Ensure password matches confirmation
                password = request.POST["password"]
                confirmation = request.POST["confirmation"]
                if password != confirmation:
                    return render(request, "mail/register.html", {
                        "message": "Passwords must match."
                    })

                # Attempt to create new user
                try:
                    user = User.objects.create_user(email, email, password)
                    user.save()
                except IntegrityError as e:
                    print(e)
                    return render(request, "mail/register.html", {
                        "message": "Email address already taken."
                    })
                login(request, user)
                return HttpResponseRedirect(reverse("index"))
            else:
                return render(request, "mail/register.html")

    ```

## Authors

- [Fracis Alcos - Linkedin](https://www.linkedin.com/in/fdoalcos/)
- [Fracis Alcos - Github](https://www.github.com/fdoalcos)


## Thank you

Thank you for everyone for reading my Project details and I really hope that you like it!
