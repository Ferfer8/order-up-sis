# 🍽️ Order Up, Sis!

A whimsical dinner menu web app where you build your meal by scooping food onto your plate with a spoon.

▶️ **Try it here:** [https://order-up-sis.netlify.app]

## About

My sister is coming home to spend Christmas with us, so I decided to make her a fun little menu app where she can order what she wants to eat. Instead of a boring form, she picks each dish by scooping it up with a spoon and putting it on her plate.

I made it for her, but it turned into something I wanted in my portfolio too. Most of my other projects are practical, and this one is where I got to be playful with design, illustration and interaction.

## How it works

1. The welcome page explains the menu.
2. Each page shows two dishes and an empty plate. The cursor is a spoon.
3. Click a dish to scoop it, then click the plate to serve it.
4. Only one dish is allowed per step. Trying to take both gets you told off.
5. The main course is built in three steps (rice, protein, side), and the plate fills up as you go.
6. At the end, the order is printed as a kitchen receipt.

## The menu

| Course | Options |
| --- | --- |
| Starter | Small chops or pepper soup |
| Main course: rice | Jollof rice or fried rice |
| Main course: protein | Chicken or fish |
| Main course: side | Salad or coleslaw |
| Dessert | Apple pie or brownie |

## Features

- **Spoon cursor.** The spoon follows the mouse, and its image changes when it's holding food.
- **Scoop and serve.** Food can be scooped onto the plate, scooped back off, and returned to its dish.
- **A plate that builds up.** The rice, protein and side stack on the same plate across the main course pages.
- **"Don't be greedy" pop-up.** Trying to pick a second dish shows a random funny message.
- **Table manners.** Putting food back in the wrong dish makes that dish shake and complain in a speech bubble.
- **A Back button that doesn't go back.** Hovering over it shows a message like "No take-backs in this kitchen."
- **Progress dots.** Five dots at the bottom show which step you're on.
- **Kitchen receipt.** The final page lists the order with silly prices ("1 hug", "doing the dishes"), a total, and a chef's verdict that reacts to what was picked.
- **Save the receipt.** The receipt can be downloaded as a PNG image.
- **Start over.** "Send it back to the kitchen" clears the order and returns to the welcome page.
- **Survives a refresh.** Progress is saved in session storage, so an accidental refresh doesn't lose the order.
- **Works on phones.** On touch devices the app runs in landscape with tap controls instead of the spoon cursor.

## Design

I created all of the assets myself in Figma: the food, plates, spoons and the table. Everything is built from basic shapes like circles, rectangles and triangles, with no stock images or icon packs. I exported each one as an SVG with a transparent background.

🎨 **Figma assets:** [https://www.figma.com/design/qRzncWhMfAQgn2m2CrBqkh/Order-up-sis-assets?node-id=0-1&t=4AotePc7f7HBZ8sb-1]

Every dish has a few versions (full, scooped, on the spoon, on the plate), and the app swaps between them as the state changes.

Shadows, hover effects and animations are done in CSS, so the SVGs stay clean and the effects can react to what the user is doing.

## Tech stack

- React
- Vite
- JavaScript
- CSS
- html-to-image (for the receipt download)
- Figma (for the illustrations)

## Running it locally

If you'd like to try it on your own machine:

```bash
git clone https://github.com/[your-username]/[your-repo-name].git
cd [your-repo-name]
npm install
npm run dev
```

Then open the link shown in the terminal, usually `http://localhost:5173`.

## Making it work on phones

I've never really made a fully responsive website before. This one depends on a mouse (the spoon follows the cursor and the labels show on hover), so it needed a way to know when it's on a touch device.

Instead of guessing the device, the app checks what it can do. Using media queries, it asks the browser whether the main input can hover and how precise the pointer is. No hover and a coarse pointer means touch. This way a touchscreen laptop still counts as a desktop, and a tablet gets the touch version.

On a touch device, the app shows a heads-up that it was made for laptop and desktop, asks for the phone to be turned sideways, and switches to tap controls. It isn't 100% responsive on phones yet, which is why the heads-up is there. Making something fully responsive, with a version that works really well on laptops, tablets and phones, is something I want to do in a future project.

## Known limitations

- The app was designed for laptop and desktop screens. It works on phones in landscape, but the layout isn't fully polished there yet.

## Possible improvements

- A fuller phone layout
- Sound effects for scooping and for the pop-ups
- More dishes and courses

## Credits

- All illustrations and design by me, made in Figma
- Fonts from Google Fonts

## License

© 2026 Jennifer Nggada. All rights reserved.

I made this for my sister, and I'm sharing it publicly as part of my portfolio. You're welcome to view the code and run it locally to try it out. Please don't copy, modify, reuse or redistribute the code or the illustrations without my permission.

Interested in using it? Contact me on [GitHub](https://github.com/Ferfer8/) or [LinkedIn](https://www.linkedin.com/in/jennifer-nggada-662219314/).

## Author

**Jennifer Nggada**
