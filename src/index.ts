/// <reference lib="DOM" />
import { UtfString } from "./utf_string";
import { UtfVisualString } from "./utf_visual_string";

// if there is a global window object add the classes to it
if (typeof window !== 'undefined') {
    (window as any).UtfString = UtfString;
    (window as any).UtfVisualString = UtfVisualString;
}

export { UtfString, UtfVisualString };
