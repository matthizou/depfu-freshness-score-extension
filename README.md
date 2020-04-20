# Depfu Freshness Scores and Icons

If you are using Depfu to manage and update your repos' external dependencies, the script/extension will help you spot immediately which need your attention.

> Some of my dependencies are litteraly on fire !  
> _A first time user_

Using the data from the depfu dashboard, this script calculates and displays how "fresh" is the version of each dependency compared to the latest version available on Github.

The lowest the freshness score is, the better.

<img src="images/screenshot-1.png" width="800">

The maths are simple. Let's take an example:

```
Locked: 1.1.5
Latest: 2.3.2
```

We go from left to right

One major version behind: `1*100` to round to the next major version  
`1.1.5 --> 2.0.0 // Score increases by 100`

Three minor versions behind: `3*10` to move 3 next minor versions forward  
`2.0.0 --> 2.3.0 // Score increases by 3*10 == 30`

Two patch versions behind: `2*1` to move 2 patch versions forward  
`2.3.0 --> 2.3.2 // Score increases by 2*1 == 2`

Total freshness score: `100 + 30 + 2 == 132`  
Icon: 🔥  
_Time to upgrade urgently this dependency !_

---

## Getting Started

### What is a userscript ?

**Userscripts** are little scripts injected in web pages to improve them. See them as addons, or extensions, (usually) scoped to pages or sites.  
Adding features/information, changing UI, hiding undesired ads, are typical examples of what they usually do.

### Prerequisite

The application is has been tested/styled on the latest version of Chrome.  
It should also work with Firefox.

In order for your browser to run userscripts, you need to install a userscript manager extension. I recommand **Tampermonkey**  
Install the [Tampermonkey extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

### Installation

Go to this url: [https://github.com/matthizou/depfu-freshness-score-extension/raw/master/depfu-freshness-score.user.js](https://github.com/matthizou/depfu-freshness-score-extension/raw/master/depfu-freshness-score.user.js)  
Tampermonkey will pick up the fact that you are displaying a raw userscript and will ask you if you want to install the script.  
Click the **install** button.

<img src="images/userscript-installation.png" width="600">

## Authors

- **Matthieu Izoulet**
