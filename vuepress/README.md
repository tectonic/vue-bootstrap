# Introduction

[[toc]]

## A quick introduction

Vue-bootstrap is a collection of Bootstrap-styled components in Vue.js.

## Installation

The components rely on Bootstrap CSS, make sure to install Bootstrap using NPM
as a prerequisite. Alternatively, import the Bootstrap styles from CDN.

```css
@import "https://stackpath.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css";
```

Use NPM to install the vue-bootstrap library:

```js
npm install "github:tectonic/vue-bootstrap" --save

// Install a specific tag
npm install "github:tectonic/vue-bootstrap#1.3.5" --save
```

At this point you can start using the components in your project:

```js
import { Modal, Datepicker } from 'vue-bootstrap';
```

## Ajax

Some of the components ([Typeahead](/components/typeahead.html), [Search field](/components/searchfield.html), [Tag Input](/components/taginput.html)) communicate with the server-side using
Ajax. This will require the `axios` peer dependency to be installed. Install `axios` with NPM
and hook it to the main Vue instance.

```js
import Vue from 'vue';
import axios from 'axios'

Vue.prototype.$http = axios;
```
