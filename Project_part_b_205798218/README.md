# Adi-Shenhav
Adi Shenhav-205798218

1. HTML: All html pages are designed using the same grid container, the same background image, logo and navigation bar via CSS file. 

a. MainPage
    Main directory of website used to identify type of user (driver/hitchhiker) and direct them to the next screen according to the flow process. 
    Designed with grid container and includes menu bar, pictures, icons and instructions for the user. 
b. Driver
    Driver user interface that uses form format to download data from user and transfer to database. Uses JS file to validate required fields and provides error box if needed. Geo-location is required and saved. Time stamp is a server based data therefore is not provided at this point in the project. Leads to 'end' page once data is processed in server. 
c. hitchhikerp1
    Hitchhiker user interface that is used as a directory for returning hitchhiker users or new hitchhiker users. Simple and discrete icons used to direct users.
d. signup
    Page used for new hitchhiker users to fill in details. Uses JS file to validate required fields and provides error box if needed. Geo-location is required and saved. Time stamp is a server based data therefore is not provided at this point in the project.Leads to either 'oops' page or 'ride' page according to server data.
e. signin
    Page used for existing hitchhiker users looking to check their match status in the event that they haven't been matched yet. Uses JS file to validate required fields and provides error box if needed. Leads to either 'oops' page or 'ride' page according to server data.  
f. oops
    Page used to notify hitchhiker users that they have not been matched.
g. ride
    Page used to notify hitchiker users that they have been matched and provides the driver details according to the server data. 
h. end
    Page used to notify driver users that their details have been added to the server. 

2. CSS: Style1.css

a. RWD: changes include change to beige background color, logo appears at the top of the page, navigation bar is displayed inline, and the header is pushed down under the nav bar. the reason for this vertical design is so no matter what device is used the logical arrangement allows the user to easily navigate through the pages.
b. Animation:
    animation used is the hover function that changes the color of the navigation bar to red when the mouse hovers over the text. Also in the MainPage the icons shift shapes when hovering over. In addition, there is a change in the border of the form boxes when the information is not validated.
c. Design:
    the design of the website uses a grid container to format the overall design in a consistent manor. each grid element in the html files is given a class or id which the css file uses to format and design. 

3. JavaScript: bgride.js
    a. validateDriverForm(): used to validate Driver form fields when submit button is pressed. validates fields using test function. validates bgu email with 
        "post.bgu.ac.il" ending. Calls geo-location function to finalize submission.  
    b. validateHHikerForm(): used to validate Hitchhiker sign-up form. Validates fields using test function. validates bgu email with 
        "post.bgu.ac.il" ending. Calls geo-location function to finalize submission.
    c. validateSignInForm(): used to validate Hitchhiker sign-in form. Validates fields using test function. validates bgu email with 
        "post.bgu.ac.il" ending. Calls geo-location function to finalize submission.
    d. GetLocation(): API used to derive longitude and latitude of user via the browser in order match users
     

Assumptions:
	The geo-location of a user is the starting point of the ride for both users
    Hitchhikers geo-location is based on the sign up form(sign-in doesn't update geo-location of hitchhiker)
	Hitchhikers are responsible to contact the driver after each match, the driver is a passive user
	Users are matched by a 10 km radius of current location
	Rides have an expiration time of 1 hour
	Validation of student status is done by student email + bgu email validation
	The app has no monetary purpose/policy affiliated with its users and rides


