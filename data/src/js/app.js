let deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function () {
    console.log("Service worker registered!");
  });
}

window.addEventListener("beforeinstallprompt", function (event) {
  console.log("Before prompt fired");
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

// let prom = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve("This is executed when its done");
//   }, 3000);
// });

// prom.then(function (val) {
//   console.log(val);
// });

// fetch("https://httpbin.org/post", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   body: JSON.stringify({
//     messages: "Does it work?",
//   }),
// })
//   .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// fetch("https://httpbin.org/ip")
//   .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
