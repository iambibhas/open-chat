Open Chat
===
Note: These instructions are for *nix systems.

Requirements
---
 - This software requires [Node.js](http://nodejs.org) and [`npm`](https://github.com/isaacs/npm) to be installed in your system.
 - You need Internet connection to set it up, once it's setup, you wont need it anymore.
 - You need latest web browsers for this to work.

Installation
---
First clone the repository, then `cd` to the cloned directory. Then install the required packages -

    $ npm install

Once packages are installed,

    $ cd site
    $ node server.js

Now open you browser and head for [http://localhost:8080/](http://localhost:8080/), and ask anyone on the LAN to visit http://&lt;your_lan_IP>:8080/.

Now you should be able to chat with video with the other person.

To stop the server, just go back to terminal and press `Ctrl+C`.