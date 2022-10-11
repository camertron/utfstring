/// <reference lib="DOM" />
import { UtfString } from "./utf_string";
import { UtfVisualString } from "./utf_visual_string";
import { isDefined } from "./utils";

// if there is a global window object add the classes to it
if (isDefined(window)) {
    (window as any).UtfString = UtfString;
    (window as any).UtfVisualString = UtfVisualString;
}

export { UtfString, UtfVisualString };
