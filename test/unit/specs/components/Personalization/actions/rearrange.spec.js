import {
  selectNodes,
  appendNode,
  createNode
} from "../../../../../../src/utils/dom";
import { initRuleComponentModules } from "../../../../../../src/components/Personalization/turbine";
import cleanUpDomChanges from "../../../../helpers/cleanUpDomChanges";

describe("Presonalization::actions::rearrange", () => {
  beforeEach(() => {
    cleanUpDomChanges("rearrange");
  });

  afterEach(() => {
    cleanUpDomChanges("rearrange");
  });

  it("should rearrange elements when from < to", () => {
    const collect = jasmine.createSpy();
    const modules = initRuleComponentModules(collect);
    const { rearrange } = modules;
    const content = `
      <li>1</li>
      <li>2</li>
      <li>3</li>
    `;
    const element = createNode(
      "ul",
      { id: "rearrange" },
      { innerHTML: content }
    );
    const elements = [element];

    appendNode(document.body, element);

    const meta = { a: 1 };
    const settings = { content: { from: 0, to: 2 }, meta };
    const event = { elements, prehidingSelector: "#rearrange" };

    return rearrange(settings, event).then(() => {
      const result = selectNodes("li");

      expect(result[0].textContent).toEqual("2");
      expect(result[1].textContent).toEqual("3");
      expect(result[2].textContent).toEqual("1");
      expect(collect).toHaveBeenCalledWith(meta);
    });
  });

  it("should rearrange elements when from > to", () => {
    const collect = jasmine.createSpy();
    const modules = initRuleComponentModules(collect);
    const { rearrange } = modules;
    const content = `
      <li>1</li>
      <li>2</li>
      <li>3</li>
    `;
    const element = createNode(
      "ul",
      { id: "rearrange" },
      { innerHTML: content }
    );
    const elements = [element];

    appendNode(document.body, element);

    const meta = { a: 1 };
    const settings = { content: { from: 2, to: 0 }, meta };
    const event = { elements, prehidingSelector: "#rearrange" };

    return rearrange(settings, event).then(() => {
      const result = selectNodes("li");

      expect(result[0].textContent).toEqual("3");
      expect(result[1].textContent).toEqual("1");
      expect(result[2].textContent).toEqual("2");
      expect(collect).toHaveBeenCalledWith(meta);
    });
  });
});