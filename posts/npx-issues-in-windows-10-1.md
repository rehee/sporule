---
title: "NPX issues in Windows 10"
author: "Sporule"
date: "2019-07-05"
categories: "coding"
tags: "react,babel,npm,npx,node.js,jsx"
---

## The Problem

I was trying to follow the "Getting Started" tutorial for React, one of the steps are setting up babel to watch and convert JSX file to normal js file.

So when I run:

```bash
npx babel --watch src --out-dir . --presets react-app/prod
```

It returns:

```bash
Path must be a string. Received undefined
```

## Cause

I am still not sure about the reason behind it but feels like the node npx is taking over the priority of the npm npx.

If you type "where npx" in the terminal, it will show all the path that is realted to npx

```bash
C:\Users\user>where npx
C:\Program Files\nodejs\npx
C:\Program Files\nodejs\npx.cmd
C:\Users\user\AppData\Roaming\npm\npx
C:\Users\user\AppData\Roaming\npm\npx.cmd
```

## Solution

To fix this issue, we will need to move the nodejs\npx and nodejs\npx.cmd below the npm\npx and npm\npx.cmd

To do this, firstly we need to remove C:\Program Files\nodejs\npx from System Variable Path

![System Variable](https://i.imgur.com/RhXANmy.png)

Then add it to User Variable Path, please ensure that the path is after the npm.

![Vairable Path](https://i.imgur.com/xmJNpPr.png)

Save the change, then reopen the terminal. Type where npx:

```bash
C:\Users\user>where npx
C:\Users\user\AppData\Roaming\npm
C:\Users\user\AppData\Roaming\npm
C:\Program Files\nodejs\npx
C:\Program Files\nodejs\npx.cmd
```

You can see that the npm is above nodejs. We can't delete the C:\Program Files\nodejs from the path completely as we need it to run nodejs.

Now run the example test code from react getting started page to watch the jsx file

```bash
C:\Users\user\Documents\Projects\GoWork\src\sporule\ui>npx babel --watch static\scripts\src --out-dir static\scripts\ -
-presets react-app/prod
static\scripts\src\like_button.js -> static\scripts\like_button.js
```

This workaround works perfectly, hopefully node can solve this Windows 10 problem as soon as possible.

## Credits

[Magnusriga](https://github.com/magnusriga) in github.