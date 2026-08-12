const sandboxInput =
  document.getElementById(
    "htmlSandboxInput"
  );

const sandboxOutput =
  document.getElementById(
    "htmlSandboxOutput"
  );


function renderSandbox() {

  sandboxOutput.srcdoc = `
    <!DOCTYPE html>

    <html>

      <body
        style="
          font-family: sans-serif;
          padding: 14px;
          margin: 0;
        "
      >

        ${sandboxInput.value}

      </body>

    </html>
  `;

}


sandboxInput.addEventListener(
  "input",
  renderSandbox
);


renderSandbox();
