import { UtfString } from "./utf_string";
import { UtfVisualString } from "./utf_visual_string";

// if there is a DOM add the object to the window object
if (typeof window !== "undefined" && window !== null) {
    (window as any).UtfString = UtfString;
    (window as any).UtfVisualString = UtfVisualString;
}

export { UtfString, UtfVisualString };
