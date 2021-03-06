export abstract class Component {

    abstract init(componentEvent: any): void;

    /**
     * Render the component to the DOM. Note that the component should handle
     * re-draw of state if it already exists and is already rendered.  This
     * could be done by just calling destroy() itself or its own internal update
     * mechanism.
     */
    abstract render(): void;

    abstract destroy(): void;

}
