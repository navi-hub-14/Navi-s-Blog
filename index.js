import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;

let posts =
    [
    {
        day: "2-11-2023",
        title: "I did it!!!", 
        time: "19:53:10",
        content: "I'm thrilled to announce that I've successfully conquered the web blog app-making challenge!. The instructions given by Angela Mam were invaluable; she taught me many new things. I am very happy and excited to move on to the next module, which is all about the database section. I'm confident that I can achieve success in that as well. Thank you, Angela Mam, and thank you, Udemy",
        name: "-Vinaya"
    },
   
    ];


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const homeContent = "Welcome to our blog, your one-stop destination for insightful articles, exciting stories, and a wealth of knowledge on a wide range of topics. Whether you're passionate about travel, technology, lifestyle, or anything in between, our blog has something for everyone. We believe in the power of sharing experiences and ideas, and our dedicated team of writers is here to bring you fresh and engaging content. Explore our collection of articles, tips, and personal narratives that inspire, inform, and entertain. Plus, we encourage you to become a part of our growing community by contributing your unique perspective. Share your own stories, expertise, and interests with our readers. We can't wait to read your blogs and connect with you on this exciting journey of learning and discovery."

const aboutContent = "This web blog is created by Vinaya G as a part of Udemy's highly-rated course, 'Web Development Bootcamp,' taught by the lead instructor, Madam Angela Yu, the founder of App Brewery. You can test this website by composing blogs. To compose blogs on this website, click the button below compose, and publish. Please note that this website does not contain a database, so any content you type will not be saved after a refresh."


const contactContent = `<p class="content">Email: maunykrishna@gmail.com<br>Mobile: 9198451588</p>`



app.get("/", (req, res) => {
    res.render("home.ejs",
        {
            homeContent: homeContent,
            posts: posts,
        });
})

app.get("/about", (req, res) => {
    res.render("about.ejs", { aboutContent: aboutContent });

})

app.get("/contact", (req, res) => {
    res.render("contact.ejs", { contactContent: contactContent });
})

app.get("/compose", (req, res) => {
    const date = {
        day: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${ new Date().getSeconds()}`
    }
    res.render("compose.ejs", date);

})

app.post("/compose", (req, res) => {
    const {day, title, content, name} = req.body;
    const compose = {day, title, content, name};
    posts.push(compose);
    res.redirect("/");
})

app.get("/posts/:postName", (req, res) => {

    var id = req.params.postName;

    posts.forEach((post, index) => {

        // var postTitle = _.lowerCase(post.title)

        if (id == index) {

            res.render("post.ejs",
                {
                    title: post.title,
                    day: post.day,
                    content: post.content,
                    name: post.name,
                    index: id
                })
            }
    });

});

app.get("/edit/:index", (req, res) => {
    var id = req.params.index;
    var post = posts[id];

    res.render('edit.ejs', {post, id});
    // posts.forEach((post, index) => {

    //     var postTitle = _.lowerCase(post.title)
    //     // var post = posts[postTitle]

    //     if (parameter === postTitle) {

    //         res.render("edit.ejs",
    //             {
    //                 day: post.day,
    //                 title: post.title,
    //                 content: post.content,
    //                 name: post.name,
    //                 index: index
    //             })
                
    //     }

    // });
})

app.post("/edit/:index", (req, res) => {

    const id = req.params.index;
    const {title, day, content, name} = req.body;
    posts[id] = {title, day, content, name};
    res.redirect("/");
   
})

// Delete a Blog Post
app.get('/delete/:postID', (req, res) => {
    const id = req.params.postID;
    posts.splice(id, 1);
    res.redirect('/');

});

app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port ${port}`);
})