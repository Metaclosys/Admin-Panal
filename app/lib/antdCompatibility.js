import * as ReactDOM from "react-dom";

function ensureLegacyCreateRoot() {
  if (
    !ReactDOM ||
    typeof ReactDOM !== "object" ||
    typeof ReactDOM.createRoot === "function" ||
    typeof ReactDOM.render !== "function"
  ) {
    return;
  }

  ReactDOM.createRoot = function legacyCreateRoot(container) {
    return {
      render: (node) => {
        ReactDOM.render(node, container);
      },
      unmount: () => {
        if (typeof ReactDOM.unmountComponentAtNode === "function") {
          ReactDOM.unmountComponentAtNode(container);
        }
      },
    };
  };
}

ensureLegacyCreateRoot();
