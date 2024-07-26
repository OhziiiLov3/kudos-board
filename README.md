# Fivespace - Social Club

## Application: Kudos Board
**By:** Keith Baskerville

[Click here to watch demo](https://fivespaces.netlify.app/assets/images/fivespaceDemo.mp4)
[![Watch the video](frontend/kudos-board-frontend/src/assets/images/fivespace.png)](frontend/kudos-board-frontend/src/assets/images/fivespaceDemo.mp4)


## Technologies
- **Frontend:** React
- **Backend:** Express, Node
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT Token Auth
- **API Integration:** Giphy API

**Deployed Application:** [fiveSpace Deployed Site](https://fivespaces.netlify.app/)

## Core Features

### **Home Page**
- **Header, Banner, Search, Board Grid, and Footer:** Structured layout.
- **Board Previews:** Displays images/gifs and titles of all boards on initial load.
- **Filtering:** Boards can be filtered by categories (recent, celebration, thank you, inspiration).
- **Search:** Users can search for boards by name.
- **Navigation:** Click on a board to navigate to its detailed page.
- **Create Board:** Users can create new boards with a title, category, and optional author.
- **Delete Board:** Users can delete boards.

### **Board Page**
- **Card List:** Displays all cards for a board.
- **Card Features:** Each card includes a text message and a gif from the [Giphy API](https://developers.giphy.com/docs/api/).
- **Author Sign:** Optionally sign cards as the author.
- **Interactions:** Cards can be upvoted, deleted, and ordered by most votes.
- **Giphy URL:** Users can copy the giphy URL to the clipboard.

### **User Accounts**
- **Authentication:** Users can log in and sign up with a username and password.
- **Board and Card Association:** Boards and cards are tied to users.
- **No Anonymous Cards:** Only authenticated users can create cards.
- **User Filters:** Add a filter to display only the current user's boards.
- **Delete Boards:** Users can delete their own boards.

### **Comments**
- **Comment Functionality:** Users can comment on cards, hide/show comments, and delete their own comments.
- **View Comments:** Users can view comments made by others.

## Deployment
- **Frontend:** [Deployed via Netlify](https://fivespaces.netlify.app/)
- **Backend:** [Deployed via Render](https://five-7z6a.onrender.com/api/spaces)







