## The headline idea (don't skip this)

> **In Express, everything is middleware. Even routers.**

Not "kind of". Literally.

Your app is a **pipeline**, and a request flows through it step by step.

---

## Start at the left: Incoming Request 🟢

A request arrives from the browser or client.

At this moment:

- No body is parsed

- No headers are added

- No authentication is done

- Nothing is validated

It's just a raw HTTP request.

---

## The Middleware Stack (the red bracket)

That red line labeled **MIDDLEWARE STACK** means:

> Express will run middleware **in the exact order you wrote it in code**

Order is not a suggestion.\
Order is law.

`app.use(express.json());
app.use(logger);
app.use(auth);
app.get('/api', handler);`

This order is the pipeline.

---

## Each grey box = one middleware

Each box is a function like this:

`(req, res, next) => {
  // do something
  next();
}`

Key rules:

- Middleware runs **one at a time**

- It can modify `req` or `res`

- It must decide what happens next

---

## `next()` --- the gatekeeper

This is the most important arrow in the diagram.

### If middleware calls `next()`:

➡️ Request moves to the **next middleware**

### If middleware sends a response:

`res.send(...)
res.json(...)
res.end(...)`

➡️ The pipeline **stops immediately**

### If middleware does neither:

❌ Request hangs forever

That's not Express being buggy.\
That's you leaving the pipeline half-open.

---

## The examples under each middleware box

These are **realistic responsibilities**:

### 1️⃣ Parsing body

`express.json()`

- Reads incoming stream

- Parses JSON

- Sets `req.body`

Without this, POST data is invisible.

---

### 2️⃣ Logging

`console.log(req.method, req.url);`

- Observes the request

- Does not change behavior

- Always calls `next()`

---

### 3️⃣ Setting headers

`res.set('X-Powered-By', 'Express');`

- Prepares response metadata

- Still not sending the response

---

### 4️⃣ Router (yes, router is middleware)

`app.get('/api', (req, res) => {
  res.send('done');
});`

This is just **middleware that ends the pipeline**.

That's why the diagram highlights `res.send(...)` in the last box.

---

## The right side: Response 🟢

Once a middleware sends a response:

- Express stops processing

- Remaining middleware is skipped

- Response goes back to the client

There is **exactly one response per request**.

Trying to send two causes errors.

---

## Why "everything is middleware" matters

Because it explains:

- Why order matters

- Why auth must come before routes

- Why `express.json()` must be at the top

- Why routers can be mounted with `app.use()`

- Why error handling is middleware

Nothing is special.\
Everything follows the same rule.

---

## The full request-response cycle (plain English)

1.  Request arrives

2.  Middleware #1 runs → calls `next()`

3.  Middleware #2 runs → calls `next()`

4.  Middleware #3 runs → calls `next()`

5.  Route handler runs → sends response

6.  Pipeline stops

7.  Response goes back

---

## One sentence to lock it in

**Express is not a controller framework --- it is a middleware pipeline where requests flow until someone ends them.**
