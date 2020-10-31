import React, {Component} from 'react'
import classes from './leftPanel.module.css'
import Backdrop from "../../../../../../../components/UI/backdrop/backdrop";
import ClassifiersTree from "../../../classifiersTree/classifiersTree";
import CollapsedFilters from "../../../filters/collapsedFilters/collapsedFilters";
import OtherFilters from "../../../filters/otherFilters/otherFilters";

class LeftPanel extends Component {

    openHandle = group => {
        this.props.setGroupValues('newGroup', {id: group.id, name: group.name, required_group: group.required_group});
        this.props.setGroupValues('changeStatus', false);
        this.props.setGroupValues('modalGroup', null);
        this.props.getActionById("get", "group", {path: "Group/Group", id: group.id});
        this.props.getSubgroupWithGroupId(group.id);
        this.props.setProductValues('classifiersModal', true)
    };

    classifierOpenHandler = id => {
        this.props.setGroupValues('moveElement', null);
        this.props.setGroupValues('controllerId', null);
        this.props.getAllGroup();
        this.props.setGroupValues('newGroup', {
            name: '',
            required_group: false,
            group_type: '1'
        });
        this.props.setProductValues('classifiersModal', false);
        this.props.setGroupValues('groupActiveId', id);
        this.props.setGroupValues('modalGroup', "edit");
    };

    render() {

        return (
            <div className={classes.leftPanel}>
                {
                    this.props.toggleClassifier ?
                        <Backdrop
                            className={classes.backdrop}
                            // Methods
                            onClick={() => this.props.setFiltersValue('toggleClassifier', false)}
                        />
                        :
                        null
                }
                <ClassifiersTree
                    handleOpen={this.openHandle}
                    classifierOpenHandler={this.classifierOpenHandler}
                />
                <CollapsedFilters
                    measurementsFilters={this.props.measurementsFilters}
                />
                <OtherFilters
                    otherFilters={this.props.otherFilters}
                />
            </div>
        )
    }
}

export default LeftPanel;