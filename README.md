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

![Untitled design (1)](https://user-images.githubusercontent.com/98495736/208226236-eb7e04b7-2afd-402e-8e11-bbe8f57fce09.png)


- This is its form validation when user enter a wrong password/username
- Futhermore, let's sign as fdoalcos@gmail.com

![Untitled design (2)](https://user-images.githubusercontent.com/98495736/208226312-1ceddfef-2ca1-4f7e-bd11-e1e0b973ca1d.png)

- This would be fdoalcos@gmail.com main index, its alrady full of inbox because I used lots of test to build this project

![Untitled design (3)](https://user-images.githubusercontent.com/98495736/208226422-41acddbf-7857-46d7-8b32-0e5a4454dd19.png)


## Send Mail
- When a user submits the email composition form, the form will send a POST request to the server to actually send the email.
- After sending form, it will redirect to the Sent Mailbox to let the user know that it successfuly send an email to the user.

![Untitled design (5)](https://user-images.githubusercontent.com/98495736/208226686-a0c8e12a-3e61-4125-b88e-1305b601a4f0.png)

- Then will be redirected to the form page and shoul fill up
- For example, I want to send an email to Francis@gmaiil.com

![image](https://user-images.githubusercontent.com/98495736/208226755-3c072f49-7c17-4401-8f31-309106d25d7a.png)

- Then it would be redirected to the Sent mailbox and would load your sent Inbox to Francis@gmail.com

![Untitled design (7)](https://user-images.githubusercontent.com/98495736/208226910-c30095e1-c002-4edd-8f50-aab30d85d3c9.png)


## View Mail
- When a user clicks on an email, the user will be taken to the view email where users see the content of that email such as name of the sender, time it send, etc.
- Then now, we will login as Francis@gmail.com and we can see fdoalcos@gmail.com's Inbox to us

![Untitled design (8)](https://user-images.githubusercontent.com/98495736/208226956-92e0a790-d7f7-4799-b7a0-f5fc044d3aaa.png)

- Once we click it, it would open the inbox

![Untitled design (9)](https://user-images.githubusercontent.com/98495736/208226999-c9b872b6-f188-4d76-9946-90758f66bf7a.png)


## Archive and Unarchive
- Allow users to archive and unarchive emails that they have received.
- when a button is click, it will do its function method which is to archive or unarchive an inbox

![Untitled design (10)](https://user-images.githubusercontent.com/98495736/208227042-67fe28c9-b9b6-46ad-b7d4-c563d6b83535.png)

- Then we can see it on our archived mailbox

![Untitled design (11)](https://user-images.githubusercontent.com/98495736/208227075-533d26aa-4830-4c68-a922-ac0b4dfb006f.png)

- Else

![Untitled design (12)](https://user-images.githubusercontent.com/98495736/208227096-c1fb6191-d37c-4677-895b-a8f8deef1de8.png)


## Reply
- Allow users to reply to an email.
- Used POST request to send another request to data and put the data that will let both users to interact with each other

![Untitled design (13)](https://user-images.githubusercontent.com/98495736/208227126-69859bd4-4276-4c59-927a-19ac1024d95b.png)

- Then, we reply back to fdoalcos@gmail.com

![Untitled design (15)](https://user-images.githubusercontent.com/98495736/208227195-4278febd-35ca-4b10-bdde-0dc28e23b6c6.png)

- Going back to fdoalcos@gmail.com's POV, this is what it look like

![Untitled design (17)](https://user-images.githubusercontent.com/98495736/208227372-db470681-e6d4-440e-a21f-afbdfc364649.png)


![Untitled design (18)](https://user-images.githubusercontent.com/98495736/208227384-07795241-1e71-4a51-bba2-fb9c5c8dfb65.png)




## Future Features
- Some functions that will be implemented in the future are Starred Inbox and Important Imbox
- These functions would be implemented the way archived button was implemented

![Untitled design (19)](https://user-images.githubusercontent.com/98495736/208227563-b307a7b2-0fd0-48b5-8ebe-fa1c2ce22ee9.png)



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
