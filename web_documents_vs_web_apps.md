# Separation of concerns

From the very beginning of the Internet there was a strong emphasis on separation of concerns in web technologies. Classic position stated: HTML for the document structure, CSS for document styling and later JavaScript to make the document interactive, i.e. to fully utilize the digital medium of the Internet. Clear and effective separation that took years to question. And the one who questioned it was Facebook introducing React. Their position was: it's a separation of technologies, not concerns. And key argument was—**it's not documents anymore**. We're building massive, interactive UIs for the real-time web.


# Das Dokument

The main advantage of the Web when it first appeared was its distributed structure that let people exchange the documents freely and link things one to another. The documents themselves resembled ones created in Latex but enhanced with so called hypertextuality, i.e. being able to refer to other documents and sub-documents. User experience? Guaranteed! Though not exactly in the sense we give it to UX nowadays. 

JavaScript came late to make a better use of the digital medium. It was more or less at the same time the Web could serve Java applets for the real interactive content, so JavaScript—as its name was to suggest—was just an enhancer. Applets were fast, written in full featured language and could be served as part of HTML document. Just like an illustration in the scientific article. In this context JavaScript didn't shine and was meant mostly to make the documents more attractive and interactive. Classic example of the early use of JavaScript was a [Clock Following Mouse Cursor](http://rainbow.arch.scriptmania.com/scripts/mouse_clock3.html). 

Slow and "only a scripting language" JavaScript had one advantage over Java Applets though. It wasn't encapsulated in the isolated fixed width & height world Java Applets were. It was a part of the document itself and hence connected to the global Web. 


# AJAX

The true revolution came with AJAX—Asynchronous JavaScript and XML. No longer a web document was a static piece of structure filled with content presented in some visual manner lively enhanced by miracles like [Pregnancy Due Date Countdown](http://rainbow.arch.scriptmania.com/scripts/pregnancy_duedate.html#DueDateScripts). From now on it was a dynamic application view with its content being responsive to the user interactions with the... document?... web page? Farewell, these are gone. Now we deal with application views. Still quite structured and predictable but already truly dynamic. 

This is when UX is born. **The web interface starts to be truly reactive to the user and user's expectations start to grow**. Techniques how to speed up content delivery start to emerge, [Smalltalk replaces Java (and it's called Ruby)](http://gilesbowkett.blogspot.nl/2007/07/smalltalk-outside-ivory-tower.html), templating languages and CSS frameworks grow like mushrooms. 


# P@ssw0rd

Though the application logic is still out there on the server, there are a few exceptions that in the end make smart people elevate JavaScript role even further. One of them is a classic example of a form validation. It's obvious that for the most times a form doesn't have to use any AJAX to communicate with the back-end just to check if for example a password complies security measures. It can and is done by the form itself on the front-end.

If we take a closer look at this example we realise that it's a perfect illustration of a self-contained component. The password form contains everything it needs combining its structure (password input, hint, error message), presentation (rounded corners, red error message etc.) and logic (validation rules, event handling, error visibility, presentation schema) all in one place. And it doesn't care what form it's part of. It's responsibility is to validate the password and pass it to the higher level component—a form—if validation passes. Is it login form or a new user registration? The password component doesn't care. **It's self-contained, it provides a clear interface and does its job well** (due to excellent unit tests that cover its logic...). 


# React quickly

Having self-containing components is the main goal of React. The mind-set here is that instead of thinking about an app view (not to say a web page or  document) as a whole you think in terms of strongly isolated composable components with a clear interface and no additional dependencies. Components that are the actual functions of your application and can be used in different context depending on the user interaction, license plan or personal settings. In practice it means that **you're a UI library developer** from the day one and your application is just an example of how this library can be used. 

So what do you need to build such an isolated component? You need its structure, styling and logic. All in one place, without dependencies. 


# jQuery

Yes, jQuery! I want to call jQuery as an evidence for how much the separation of HTML, CSS and JS is an illusion and nothing more than the separation of technologies. JavaScript API for DOM manipulation is quite low level and not necessarily friendly for making complex UIs really fluid and lively. But the demand for DOM manipulation was so strong that jQuery with it's clean and focused API became a de facto standard for how you build interactive web interfaces (with some characteristic spaghetti flavor...). And what jQuery does is it takes the initial HTML structure and its styling and changes them both on the fly with JavaScript to provide the **interaction HTML and CSS do not provide**. 

The lesson for us is that jQuery showed the DOM and CSS styling is static, but the web application interfaces are not and we have to make a heavy use of JavaScript to make them reactive. 


# JSX

Putting all rants aside (we'll come back to them later) the intuition behind the JSX seems legit from the jQuery story point of view. JSX moves it a step further though—instead of taking initial HTML markup and then manipulating it via JavaScript in run-time it takes **JavaScript-first approach generating the whole markup from scratch on the fly**. Why bother HTML if we will change it as soon as the user will move the cursor? Let's make HTML just an output of JavaScript computation and nothing more. This way we no longer manipulate the DOM, we **render different component states depending on the context**—user activities, application state, changes to the external services etc.—the component operates in. 


# CSS-in-JS

Now as promised JSX rants from it's early days. "Mixing HTML with JavaScript will make our code unmaintainable!" (because what we do is much more complex than Facebook interface, isn't it?) "How will you build a template if the HTML is inside of JavaScript?!" (because you like cascades of conditionals in your favorite pseudo HTML non-standardized templating language) etc. The same voices now make countless arguments against mixing CSS and JavaScript. Just google it if you're interested (be aware there's a lot of high emotion religious kind of argument out there though).

Intuition behind CSS-in-JS follows the lesson learnt from JSX... and jQuery. Once again, think about how many times you manipulated CSS via jQuery only because it was all computed by JavaScript triggered by some user interactions. On every key stroke we check the password and change these classes from success to error and hiding some things and showing some others. 

And probably you could say: *Fine, but what's the issue? If you organize your classes well, no problem then.* The issue is encapsulation. You end up with crazy multi-level CSS selectors or element-specific classes to make changes apply to only a single piece of the UI because CSS is global. Which is fine for the web document, but works no good for the component based web app UIs.

**You want to keep style changes close to where they happen with no risk of changing somewhere else**. Password input should change the styling of itself no other form components. Is should be strictly encapsulated because the changes in structure, styling and behavior shouldn't have side-effects on other DOM elements. 


# *with emacs via sendmail**

Back in the days when we all uploaded our files to the server with Filezilla via ftp (who bothered secure connection, hand up) no one thought about any preprocessing, packaging etc. But these days are gone. Now **JavaScript build process is complex**, seriously advanced and getting more and more science-fiction features every year. 

It all started long ago with CSS pre-processors, minifiers and *LANG*-to-js compilers. They are all advanced tools but this is Webpack (and friends) that made web app build process bananas. Source maps, tree shaking, chunking, lazy loading, CSS modules and hundreds of community plugins giving you enormous control over how exactly your code is put together. And yes, you're heard right: CSS modules! 

\* it's a legendary quote from the worst polish hacker movie ever done; two hackers try to get into some system and after failing for yet another time one asks the other: *Have you tried with emacs via sendmail?*; it's a legendary quote in polish IT world; commit your code and watch the scene (in Polish) [here](https://www.youtube.com/watch?v=2yk5Gsqr7bM).  


# CSS Modules

To avoid the discussion about the toolset and the best approach on the market I just want to show what are the consequences of using CSS modules as built into Webpack. The reason is it's straight in the line of the argument here: modern web application UIs need isolated components. 

With CSS Modules you can build a **component with fully scoped and encapsulated styling with regular CSS that doesn't populate the global CSS scope**. It's implemented with quite a simple trick, but the consequences are serious (especially when you let Webpack manage other assets like fonts, icons and images for you). 

You can now structure your components like this:

```{bash}
.
└── my-component
    ├── icons.svg
    ├── index.js
    ├── some.js
    └── style.css
```

and Webpack will take care about the encapsulation. For CSS and the DOM it means you no longer have to add classes to DOM nodes just to differentiate them from the DOM nodes used in other parts of the application just to prevent them from you global CSS rules side effects. 

These components:

```{html}
<!-- Register User component -->
<label>Agree to the terms to unlock the button</label>
<input type="checkbox" onChange={agreementHandler}>
<button disabled={this.state.agreed}>Register user</button>
```

```{css}
/* Register User component */
button {
    background-color: red;
}
```

```{html}
<!-- Floofy Reddit Reader component -->
<button>Fetch more floof</button>
```

```{css}
/* Floofy Reddit Reader component */
button {
    background: url('./floofy-background.png');
}
```

can both live one next to another in one application benefiting as much as they like from full featured CSS (media queries, pseudo-classes etc.) and be fully encapsulated within component scope (you can access them with JavaScript from within the component if you like). 


# [GFDA](https://goodfuckingdesignadvice.com/#/advice/198)

The challenge comes from different angles—from design to implementation, maintenance and themes. Now suddenly there is no simple headers and sections on your web page. It's all components of your web app, e.g. one that can display any provided content in particular manner (with certain header, border on the bottom etc.) and can report changes to its geometry to higher-level components. Why would you like a grid section to report its geometry changes? To let the higher-order component  decide if it should let the section quietly disappear if too small or prevent it and alert user about the data that we're currently fetching that will be displayed in this section in about 3-5 seconds and she probably could wait for them to see. 

This example seems artificial (well.. it is!), but to know how much logic you want to put into your components go and read your old jQuery code to see how many different tasks your 'purely visual components' actually delegate to jQuery. What separation was that? 


# Math.sum()

*Web page section* differs from the *web app component* in that the later encapsulates structure, presentation and logic all in one. It knows it's duty and how to communicate with the outer world through the clear interface. **Component is thus functionality of your application as opposed to section which is the content of your web page**. 






