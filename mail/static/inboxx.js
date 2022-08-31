document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  //send email
  document.querySelector('#compose-form').onsubmit = send_email;

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#open-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}



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


function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#open-view').style.display = 'none';

  console.log(mailbox)

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  getEmail(mailbox)
}



function getEmail(mailbox) {
  // Api call for mailbox
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(test => {
        console.log(test);

        let column = (mailbox != "sent") ? `${test.sender}` : `To: ${test.recipients}`;
        const id = parseInt(test.id);
        const View = document.querySelector("#emails-view");
        const Email = document.createElement("div");
        Email.className = test.read ? "email email__read" : "email email__notread";


        Email.innerHTML = `
          <table class="table">
            <tbody><tr>
              <td class="action"><input type="checkbox"/></td>
              <td class="action"><i class="fa fa-star-o"></i></td>
              <td class="action"><i class="fa fa-bookmark-o"></i></td>
              <td class="name"><a href="#">${column}</a></td>
              <td class="subject"><a href="#"> ${test.subject} - <span class="body">${test.body}</span> </a></td>
              <td class="time">${test.timestamp}</td>
            </tr>
          </tbody></table>`;

        View.append(Email)

        Email.addEventListener('click', () => {
          OpenEmail(id, mailbox);
        });

      })
    });
}

function OpenEmail(id, mailbox) {

  document.querySelector("#open-view").style.display = 'block';
  document.querySelector("#emails-view").style.display = 'none';
  document.querySelector("#compose-view").style.display = 'none';

  // fetch individual API
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(data => {

      console.log(data);
      // const EmailOpen = document.createElement("div");
      const view = document.querySelector("#open-view");

      view.innerHTML = `
      <div class="email__open">
        <div class="email__heading">
          <h2>${data.subject}</h2>
          <i id="email__archive" class="bi bi-archive"></i>
          <div class="email__sender">
            <img>
            <p>${data.sender} to me</p>
            <p>${data.timestamp}</p>
          </div>
        </div>
        <div class="email__body">
          <p>${data.body}</p>
        </div>
        <div class="email__reply">
          <button id="email__button" class="btn btn-sm btn-outline-primary">Reply</button>
        </div>
      </div>
      `
    // change read to true
    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        read: true
      })
    })

    //reply
    const reply = document.querySelector("#email__button");

    reply.addEventListener('click', () => {
      reply_email(id)
    })


    // archived button
    const button = document.querySelector("#email__archive");

    button.addEventListener('click', () => {
      if(mailbox !== 'archive'){
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: true
          })
        })
      }
      else {
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: false
          })
        })
      }
    })
    })

}

function reply_email(id) {
  // Show compose view and hide other views
  document.querySelector('#open-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  fetch(`/emails/${id}`)
    .then(res => res.json())
    .then(data => {
      // Clear out composition fields
      
      document.querySelector('#compose-header').innerHTML = 'Reply';
      document.querySelector('#compose-recipients').value = `${data.sender}`;
      document.querySelector('#compose-subject').value = `Re: ${data.subject}`;
      document.querySelector('#compose-body').value = `On ${data.timestamp}, ${data.sender} wrote: ${data.body}`;
    })



}





