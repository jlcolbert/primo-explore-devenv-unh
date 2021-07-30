
# Table of Contents

1.  [Introduction](#org56ec7e3)
2.  [Structure](#org8d3f60d)
3.  [Installation](#orgdd39275)
    1.  [Prerequisites/Personal Configuration](#org3de7ba5)
    2.  [Using Literate Programming](#orga7676e3)



<a id="org56ec7e3"></a>

# Introduction


<a id="org8d3f60d"></a>

# Structure


<a id="orgdd39275"></a>

# Installation

Ex Libris provides decent documentation for getting the development environment set up: <https://github.com/ExLibrisGroup/primo-explore-devenv>

However, they give no documentation for using common options that third-party packages use/require, such as the `--browserify` flag when using `gulp`.
Here is how I set up my development environment exactly how I have it, step by step.


<a id="org3de7ba5"></a>

## Prerequisites/Personal Configuration

**Install Homebrew**

I have a MacBook Pro, and I use Homebrew to manage my packages.
Run the following in your terminal:

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

**Install the iTerm2 terminal emulator**

    brew install --cask iterm2

**Install the fish shell (optional)**

I like fish as opposed to bash or zsh.
This step is optional, but the way I will eventually install `nvm` will differ from the way you do if you use bash or zsh.
If you use fish, make sure to make it your default shell: <https://fishshell.com/docs/current/tutorial.html#switching-to-fish>

    brew install fish

**Install NVM**

Because I use the fish shell, I will do this differently than you will if you use bash or zsh.
If you are using something that isn&rsquo;t fish, follow these instructions: <https://github.com/nvm-sh/nvm#installing-and-updating>

If you *are* using fish, then install the `nvm.fish` Fisher plugin by running this in the command line:

    fisher install jorgebucaran/nvm.fish

Then you&rsquo;ll need to install the **latest stable release** of Node.js:

    nvm install latest

Set the default version:

    set --universal nvm_default_version lts

**Install gulp globally**

    npm install -g gulp

**Install yarn globally**

    npm install -g yarn


<a id="orga7676e3"></a>

## Using Literate Programming

