import React, {useRef} from 'react'
import {connect} from "react-redux";
import {showLayout} from '../../../redux/actions'
import './style.css'
import Button from "react-bootstrap/Button";
import {IoIosClose} from "react-icons/io";
import PropTypes from "prop-types";
import { CSSTransition } from 'react-transition-group'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside';
import {components} from '../../Layout/useLayout';

function UpperLayer(props) {
    console.log('Render UpperLayer, region = ', props.region);

    const ref = useRef();
    useOnClickOutside(ref, (e)=>props.showLayout({region: '', component: ''}));

    return (
        <div className="UpperLayerBlock">
            <CSSTransition
                in={props.layout.region === props.region} timeout={200} classNames="UpperLayerBlockTransition"
            >
                <>
                    {
                        (props.layout.region === props.region)
                        ? <div className="UpperLayer" ref={ref}>
                              {props.layout.component ? components[props.layout.component] : null}
                              <Button
                                  title="close"
                                  variant="outline-danger"
                                  className="closeLayout"
                                  onClick={(e)=>props.showLayout({region: '', component: ''})}>
                                  <IoIosClose />
                              </Button>
                          </div>
                        : null
                    }
                </>
            </CSSTransition>
            {props.children}
        </div>
    )
}

UpperLayer.propTypes = {
    region: PropTypes.string.isRequired,
    layout: PropTypes.object.isRequired,
    showLayout: PropTypes.func.isRequired
}

const mapStateToProps = store => {
    return {
        layout: store.app.layout,
    }
}
const mapDispatchToProps = {
    showLayout
}

export default connect(mapStateToProps, mapDispatchToProps)(UpperLayer)