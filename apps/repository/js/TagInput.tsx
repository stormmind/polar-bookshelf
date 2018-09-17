import * as React from 'react';
import {Popover, PopoverBody} from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';
import {Blackout} from './Blackout';
import {Optional} from '../../../web/js/util/ts/Optional';
import {RepoDocInfo} from './RepoDocInfo';
import {Tag} from '../../../web/js/tags/Tag';
import {Preconditions} from '../../../web/js/Preconditions';

let SEQUENCE = 0;

// noinspection TsLint
export class TagInput extends React.Component<TagInputProps, TagInputState> {

    private readonly id = "popover-" + SEQUENCE++;

    constructor(props: TagInputProps, context: any) {
        super(props, context);

        Preconditions.assertPresent(props.repoDocInfo);
        Preconditions.assertPresent(props.repoDocInfo.docInfo, "repoDocInfo.docInfo");

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            popoverOpen: false
        };

    }
    public render() {

        const options: TagOption[] =
            Optional.of(this.props.options).getOrElse([]);

        return (

            <div>

                <i id={this.id} onClick={this.toggle} className="fa fa-tag doc-button doc-button-inactive"/>

                <Popover placement="auto"
                         isOpen={this.state.popoverOpen}
                         target={this.id}
                         toggle={this.toggle}
                         className="tag-input-popover">
                    {/*<PopoverHeader>Popover Title</PopoverHeader>*/}
                    <PopoverBody>

                        <strong>Enter tags:</strong>

                        <CreatableSelect
                            isMulti
                            isClearable
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={this.handleChange}
                            options={options} />

                        {/*<Button onClick={this.save}>*/}
                        {/*Save*/}
                        {/*</Button>*/}

                    </PopoverBody>
                </Popover>

            </div>

        );

    }

    private save() {
        // noop
    }

    private toggle() {

        const open = !this.state.popoverOpen;

        if (open) {
            Blackout.enable();
        } else {
            Blackout.disable();

        }

        this.setState({
            popoverOpen: open
        });

    }

    private handleChange(selectedOptions: any) {

        // TODO: couldn't figure out the input type situation here.

        console.log(`Options selected:`, selectedOptions);

        if (this.props.onChange) {

            const tags = this.toTags(selectedOptions);

            this.props.onChange(this.props.repoDocInfo, tags);
        }

    }

    private toTags(tagOptions: TagOption[]): Tag[] {

        return tagOptions.map((current): Tag => {

            return {
                id: current.value,
                label: current.label
            };

        });

    }

}

interface TagInputState {
    popoverOpen: boolean;
}

export interface TagInputProps {

    repoDocInfo: RepoDocInfo;

    onChange?: (repoDocInfo: RepoDocInfo, values: Tag[]) => void;

    options?: TagOption[];

}

export interface TagOption {
    readonly value: string;
    readonly label: string;
}