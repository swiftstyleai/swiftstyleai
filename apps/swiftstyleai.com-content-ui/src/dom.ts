// https://stackoverflow.com/questions/52834774/dom-event-when-element-is-removed
// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.element.html#parentelement
export function listenUnmountEvent(target: Element, cb: () => void) {
  // Element is the whatever subtree/element you need to watch over
  let inDom = document.body.contains(target);
  const callback = (_: MutationRecord[], observer: MutationObserver) => {
    if (!document.body.contains(target)) {
      inDom = false;
      observer.disconnect();
      cb();
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(document.body, {
    // Set to true to monitor the target node (and, if subtree is true, its descendants) for the addition of new child nodes or removal of existing child nodes. The default value is false.
    childList: true,
    // Set to true to extend monitoring to the entire subtree of nodes rooted at target. All of the other properties are then extended to all of the nodes in the subtree instead of applying solely to the target node. The default value is false.
    subtree: true,
  });
}
