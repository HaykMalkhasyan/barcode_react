import React from 'react'

const Icons = props => {

    switch (props.type) {
        case 'close':
            return (
                <svg width={props.width || 14} height={props.height || 14} viewBox="0 0 14.178 14.152">
                    {
                        !props.className ?
                            <defs>
                                <style>{".close{fill:#4b4b4b;stroke:#4b4b4b;opacity:0.5;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "close"}
                        d="M26.478,13.232,20.6,19.124a.263.263,0,0,1-.381,0L14.33,13.232a.263.263,0,0,0-.381,0h0a.263.263,0,0,0,0,.381L19.842,19.5a.263.263,0,0,1,0,.381l-5.91,5.892a.263.263,0,0,0,0,.381h0a.263.263,0,0,0,.381,0L20.2,20.266a.263.263,0,0,1,.381,0l5.892,5.91a.263.263,0,0,0,.381,0h0a.263.263,0,0,0,0-.381L20.984,19.9a.263.263,0,0,1,0-.381l5.892-5.892a.263.263,0,0,0,0-.381h0A.27.27,0,0,0,26.478,13.232Z"
                        transform="translate(-13.324 -12.65)"
                    />
                </svg>
            );
        case 'save':
            return (
                <svg width={props.width || 19} height={props.height || 21} viewBox="0 0 19.085 21.086">
                    {
                        !props.className ?
                            <defs>
                                <style>{".save{fill:#a4a4a4;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "save"}
                        d="M27.47,8.316,23.722,4.338a.468.468,0,0,0-.345-.138H11.259A2.767,2.767,0,0,0,8.5,6.959V22.527a2.767,2.767,0,0,0,2.759,2.759H24.826a2.767,2.767,0,0,0,2.759-2.759V8.615A.437.437,0,0,0,27.47,8.316ZM13.283,5.12h7.979v6.025H13.283ZM26.666,22.5a1.845,1.845,0,0,1-1.84,1.84H11.259A1.845,1.845,0,0,1,9.42,22.5V6.959a1.845,1.845,0,0,1,1.84-1.84h1.1V11.6a.461.461,0,0,0,.46.46h8.9a.461.461,0,0,0,.46-.46V5.12h.989l3.5,3.7Zm-4.944-5.749h-8.9a.46.46,0,1,0,0,.92h8.9a.46.46,0,0,0,0-.92Zm0,2.3h-8.9a.46.46,0,0,0,0,.92h8.9a.46.46,0,0,0,0-.92Zm0,2.3h-8.9a.46.46,0,1,0,0,.92h8.9a.46.46,0,0,0,0-.92Z"
                        transform="translate(-8.5 -4.2)"
                    />
                </svg>
            );
        case 'mFolder':
            return (
                <svg width={props.width || 22} height={props.height || 21} viewBox="0 0 23.249 22.828">
                    <defs>
                        <style>
                            {
                                ".fa,.fc{fill:#fff;}.fa{stroke:#fd8087;}.fb{fill:#fe646f;}.fc{stroke:#8ac9fe;}.fd{fill:#60b7ff;}.fe{fill:#fcfbf4;stroke:#fed402;}.ff{fill:#fac600;}.fg{fill:#b5adb6;}"
                            }
                        </style>
                    </defs>
                    <g transform="translate(0.5 0.5)">
                        <path
                            className="fa"
                            d="M492.119,216.355h20.01a1.131,1.131,0,0,0,1.119-1.142V203.879a1.131,1.131,0,0,0-1.119-1.142H498.353l-.64-1.956a1.121,1.121,0,0,0-1.061-.78h-4.532A1.131,1.131,0,0,0,491,201.142v14.071a1.131,1.131,0,0,0,1.119,1.142Zm0,0"
                            transform="translate(-491 -200)"
                        />
                        <path
                            className="fb"
                            d="M505.484,247.061a.857.857,0,0,1-.813.586H491v11.11a1.142,1.142,0,0,0,1.142,1.142h20.421a1.142,1.142,0,0,0,1.142-1.142V247.423a1.142,1.142,0,0,0-1.142-1.142h-6a1.142,1.142,0,0,0-1.083.78Zm0,0"
                            transform="translate(-491 -243.544)"
                        />
                        <path
                            className="fc"
                            d="M512.106,262.636H492.142A1.142,1.142,0,0,1,491,261.494V250.159a1.142,1.142,0,0,1,1.142-1.142H506.2l.653-1.956a1.142,1.142,0,0,1,1.083-.78h4.168a1.142,1.142,0,0,1,1.142,1.142v14.07a1.142,1.142,0,0,1-1.142,1.142Zm0,0"
                            transform="translate(-491 -243.544)"
                        />
                        <path
                            className="fd"
                            d="M513.706,261.494a1.142,1.142,0,0,1-1.142,1.142H492.142A1.142,1.142,0,0,1,491,261.494v-11.11h20.193a1.142,1.142,0,0,0,1.142-1.142v-1.818a1.142,1.142,0,0,0-1.142-1.142h1.371a1.142,1.142,0,0,1,1.142,1.142Zm0,0"
                            transform="translate(-491 -243.544)"
                        />
                        <path
                            className="fe"
                            d="M492.142,308.913h19.964a1.142,1.142,0,0,0,1.142-1.142V296.436a1.142,1.142,0,0,0-1.142-1.142H498.5l-.653-1.956a1.142,1.142,0,0,0-1.083-.781h-4.625A1.142,1.142,0,0,0,491,293.7v14.071a1.142,1.142,0,0,0,1.142,1.142Zm0,0"
                            transform="translate(-491 -287.085)"
                        />
                        <path
                            className="ff"
                            d="M833.875,338.836H832.5a1.142,1.142,0,0,1,1.142,1.142v11.334a1.142,1.142,0,0,1-1.142,1.142h1.37a1.142,1.142,0,0,0,1.142-1.142V339.978a1.142,1.142,0,0,0-1.142-1.142Zm0,0"
                            transform="translate(-812.311 -330.627)"
                        />
                        <path
                            className="fg"
                            d="M602,510.422"
                            transform="translate(-595.437 -492.067)"
                        />
                    </g>
                </svg>
            );
        case 'folder':
            return (
                <svg width={props.width || 18.302} height={props.height || 13.255} viewBox="0 0 18.302 13.255">
                    <defs>
                        <style>{".foldera,.folderb{fill:none;}.foldera{stroke:#ffa000;}.folderb{stroke:#ffc107;}"}</style>
                    </defs>
                    <g transform="translate(-59.375 -279.245)">
                        <path
                            className="foldera"
                            d="M55.283,74.667H44.469a1.8,1.8,0,0,0-1.8,1.8v.721a.36.36,0,0,0,.36.36h3.085a.365.365,0,0,1,.342.242l.393,1.189a1.089,1.089,0,0,0,1.024.732h8.853a.36.36,0,0,0,.36-.36V76.469A1.8,1.8,0,0,0,55.283,74.667Z"
                            transform="translate(18.65 205.078)"
                        />
                        <path
                            className="folderb"
                            d="M16.22,140.83H6.647a.371.371,0,0,1-.342-.242L5.911,139.4a1.09,1.09,0,0,0-1.024-.732H1.081A1.081,1.081,0,0,0,0,139.748a10.219,10.219,0,0,0,.426,2.93l1.442,4.8A1.8,1.8,0,0,0,3.6,148.76H13.776a1.8,1.8,0,0,0,1.693-1.171l1.557-4.154a4.371,4.371,0,0,0,.275-1.523A1.081,1.081,0,0,0,16.22,140.83Z"
                            transform="translate(59.875 143.241)"
                        />
                    </g>
                </svg>
            );
        case 'add':
            return (
                <svg width={props.width || 14} height={props.height || 14} viewBox="0 0 15.761 15.761">
                    {
                        !props.className ?
                            <defs>
                                <style>{".add{fill: #0eb139;stroke: #0eb139;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(7.88 0.736) rotate(45)">
                        <path
                            className={props.className || 'add'}
                            d="M9.733.063,5.206,4.6a.2.2,0,0,1-.293,0L.37.063a.2.2,0,0,0-.293,0h0a.2.2,0,0,0,0,.293L4.619,4.9a.2.2,0,0,1,0,.293L.063,9.733a.2.2,0,0,0,0,.293h0a.2.2,0,0,0,.293,0L4.9,5.485a.2.2,0,0,1,.293,0l4.542,4.556a.2.2,0,0,0,.293,0h0a.2.2,0,0,0,0-.293L5.5,5.206a.2.2,0,0,1,0-.293L10.041.37a.2.2,0,0,0,0-.293h0A.208.208,0,0,0,9.733.063Z"
                            transform="translate(0 0)"
                        />
                    </g>
                </svg>
            );
        case 'arrows':
            return (
                <svg width={props.width || 14} height={props.height || 14} viewBox="0 0 16.169 16.168">
                    {
                        !props.className ?
                            <defs>
                                <style>{".arrows{fill: #61a8dd;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || 'arrows'}
                        d="M14.045,5.99a.367.367,0,0,0-.218.1l-2.2,2.2a.367.367,0,1,0,.517.523l1.579-1.579v6.465H7.252l1.579-1.579a.368.368,0,1,0-.517-.523l-2.2,2.2a.368.368,0,0,0,0,.523l2.2,2.2a.367.367,0,1,0,.517-.523L7.252,14.442h6.465V20.9l-1.579-1.579a.368.368,0,1,0-.517.523l2.2,2.2a.368.368,0,0,0,.517,0l2.2-2.2a.367.367,0,1,0-.517-.523L14.452,20.9v-6.46h6.465l-1.579,1.573a.367.367,0,1,0,.517.523l2.2-2.2a.368.368,0,0,0,0-.523l-2.2-2.2a.368.368,0,1,0-.517.523l1.579,1.579H14.452V7.242l1.579,1.579a.367.367,0,1,0,.517-.523l-2.2-2.2A.368.368,0,0,0,14.045,5.99Z"
                        transform="translate(-6 -5.988)"
                    />
                </svg>
            );
        case 'edit':
            return (
                <svg width={props.width || 14} height={props.height || 14} viewBox="0 0 14.468 16.168">
                    {
                        !props.className ?
                            <defs>
                                <style>{".edit{fill: #747ad5;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0 0)">
                        <rect
                            className={props.className || 'edit'}
                            width={13.617}
                            height={0.851}
                            transform="translate(0 15.318)"
                        />
                        <path
                            className={props.className || 'edit'}
                            d="M16.32,2.4l-.9-.9a1.917,1.917,0,0,0-2.708,0L4.585,9.622a.425.425,0,0,0-.108.184l-1.2,4.213a.426.426,0,0,0,.526.527l4.213-1.2a.421.421,0,0,0,.184-.108L16.32,5.109a1.914,1.914,0,0,0,0-2.708ZM7.672,12.553l-3.37.963.963-3.37L11.806,3.6l2.407,2.407Zm8.046-8.045-.9.9L12.408,3l.9-.9a1.066,1.066,0,0,1,1.5,0l.9.9a1.065,1.065,0,0,1,0,1.5Z"
                            transform="translate(-2.413 -0.939)"
                        />
                    </g>
                </svg>
            );
        case 'delete':
            return (
                <svg width={props.width || 14} height={props.height || 14} viewBox="0 0 15.558 16.568">
                    {
                        !props.className ?
                            <defs>
                                <style>{".delete{fill: #fe5f55;stroke: #fe5f55;stroke-width: 1px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-19.8 -17.8)">
                        <path
                            className={props.className || 'delete'}
                            d="M23.537,34.168h8.084A1.768,1.768,0,0,0,33.39,32.4V21.284h1.516a.253.253,0,0,0,0-.505H30.358V19.263A1.263,1.263,0,0,0,29.095,18H26.063A1.263,1.263,0,0,0,24.8,19.263v1.516H20.253a.253.253,0,0,0,0,.505h1.516V32.4A1.768,1.768,0,0,0,23.537,34.168Zm1.768-14.905a.758.758,0,0,1,.758-.758h3.032a.758.758,0,0,1,.758.758v1.516H25.305Zm7.579,2.021V32.4a1.263,1.263,0,0,1-1.263,1.263H23.537A1.263,1.263,0,0,1,22.274,32.4V21.284Z"
                        />
                        <path
                            className={props.className || 'delete'}
                            d="M41.253,50.305a.253.253,0,0,0,.253-.253v-4.8a.253.253,0,0,0-.505,0v4.8A.253.253,0,0,0,41.253,50.305Z"
                            transform="translate(-15.695 -20.179)"
                        />
                        <path
                            className={props.className || 'delete'}
                            d="M57.253,50.305a.253.253,0,0,0,.253-.253v-4.8a.253.253,0,0,0-.505,0v4.8A.253.253,0,0,0,57.253,50.305Z"
                            transform="translate(-27.653 -20.179)"
                        />
                    </g>
                </svg>
            );
        case 'left-angle':
            return (
                <svg width={props.width || 5} height={props.height || 9} viewBox="0 0 5.182 9.675">
                    {
                        !props.className ?
                            <defs>
                                <style>{".left-angle{fill: #414141;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(5.182) rotate(90)">
                        <path
                            className={props.className || 'left-angle'}
                            d="M4.907,5.178a.516.516,0,0,0,.285-.14L9.492.91A.516.516,0,1,0,8.782.163L4.837,3.952.893.163A.516.516,0,1,0,.183.91l4.3,4.128A.516.516,0,0,0,4.907,5.178Z"
                        />
                    </g>
                </svg>
            );
        case 'right-angle':
            return (
                <svg width={props.width || 5} height={props.height || 9} viewBox="0 0 5.182 9.675">
                    {
                        !props.className ?
                            <defs>
                                <style>{".right-angle{fill: #414141;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0 9.675) rotate(-90)">
                        <g transform="translate(0 0)">
                            <path
                                className={props.className || 'right-angle'}
                                d="M4.907,5.178a.516.516,0,0,0,.285-.14L9.492.91A.516.516,0,1,0,8.782.163L4.837,3.952.893.163A.516.516,0,1,0,.183.91l4.3,4.128A.516.516,0,0,0,4.907,5.178Z"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'check':
            return (
                <svg width={props.width || 11} height={props.height || 10} viewBox="0 0 11.428 10.35">
                    {
                        !props.className ?
                            <defs>
                                <style>{".check{fill: #fff;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || 'check'}
                        d="M3.629,10.827h0a.672.672,0,0,0,.148.939l4.24,3.084L14.8,5.569h0a.672.672,0,0,0-.146-.939h0a.672.672,0,0,0-.939.146l-5.991,8.2L4.568,10.679h0A.672.672,0,0,0,3.629,10.827Z"
                        transform="translate(-3.5 -4.5)"
                    />
                </svg>
            );
        case 'back-page':
            return (
                <svg width={props.width || 22} height={props.height || 12} viewBox="0 0 22.001 12.203">
                    {
                        !props.className ?
                            <defs>
                                <style>{".back-page{fill: #4b4b4b;opacity: 0.56;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || 'back-page'}
                        d="M143.761,42.5a.875.875,0,0,0-.876.876V61.522l-3.731-3.706a.875.875,0,1,0-1.232,1.242l5.221,5.19a.884.884,0,0,0,1.237,0l5.226-5.19a.875.875,0,0,0-1.232-1.242l-3.736,3.706V43.376A.879.879,0,0,0,143.761,42.5Z"
                        transform="translate(64.501 -137.662) rotate(90)"
                    />
                </svg>
            );
        case 'search':
            return (
                <svg width={props.width || 19} height={props.height || 22} viewBox="0 0 19.939 23.047">
                    {
                        !props.className ?
                            <defs>
                                <style>{".search{fill: #565481;stroke: #fff;stroke-width: 0;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0.101 0.1)">
                        <g transform="translate(0 0)">
                            <path
                                className={props.className || 'search'}
                                d="M17.238,22.294l-3.673-4.87a1.39,1.39,0,0,1-.1-1.519l-.892-1.182a8.084,8.084,0,1,1,.874-.687l.905,1.2a1.388,1.388,0,0,1,1.432.516l3.673,4.87a1.389,1.389,0,0,1-2.219,1.673ZM1.111,8.056A6.944,6.944,0,1,0,8.055,1.112,6.952,6.952,0,0,0,1.111,8.056Z"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'left-arrow':
            return (
                <svg width={props.width || 33} height={props.height || 25} viewBox="0 0 33.092 25.023">
                    {
                        !props.className ?
                            <defs>
                                <style>{".left-arrow{fill:#ff9d52;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || 'left-arrow'}
                        d="M15.368,26.335a1.936,1.936,0,0,0,.863-.2,1.978,1.978,0,0,0,1.129-1.792V21.787a.666.666,0,0,1,.664-.664H31.3a2,2,0,0,0,1.991-1.992.664.664,0,1,0-1.328,0,.666.666,0,0,1-.664.664H18.024a2,2,0,0,0-1.991,1.992v2.556a.627.627,0,0,1-.365.6.741.741,0,0,1-.7-.066L1.826,14.319a.664.664,0,0,1,0-1.062L14.937,2.768a.6.6,0,0,1,.7-.066A.627.627,0,0,1,16,3.3V5.855a2,2,0,0,0,1.991,1.992H31.267a.666.666,0,0,1,.664.664V19.231a.664.664,0,1,0,1.328,0V8.51a2,2,0,0,0-1.991-1.992H17.991a.666.666,0,0,1-.664-.664V3.3a1.988,1.988,0,0,0-3.22-1.56L.963,12.261A2.033,2.033,0,0,0,.2,13.821a1.98,1.98,0,0,0,.763,1.56L14.14,25.87A1.885,1.885,0,0,0,15.368,26.335Z"
                        transform="translate(-0.2 -1.311)"
                    />
                </svg>
            );
        case 'right-arrow':
            return (
                <svg width={props.width || 33} height={props.height || 25} viewBox="0 0 33.092 25.023">
                    <defs>
                        <style>{".right-arrow{fill:#ff9d52;}"}</style>
                    </defs>
                    <path
                        className={props.className || 'right-arrow'}
                        d="M18.123,26.334a1.937,1.937,0,0,1-.863-.2,1.978,1.978,0,0,1-1.129-1.792V21.787a.666.666,0,0,0-.664-.664H2.192A2,2,0,0,1,.2,19.131a.664.664,0,1,1,1.328,0,.666.666,0,0,0,.664.664H15.468a2,2,0,0,1,1.991,1.991v2.556a.627.627,0,0,0,.365.6.741.741,0,0,0,.7-.066L31.666,14.319a.664.664,0,0,0,0-1.062L18.555,2.768a.6.6,0,0,0-.7-.066.627.627,0,0,0-.365.6V5.855A2,2,0,0,1,15.5,7.846H2.225a.666.666,0,0,0-.664.664V19.231a.664.664,0,1,1-1.328,0V8.51A2,2,0,0,1,2.225,6.519H15.5a.666.666,0,0,0,.664-.664V3.3a1.988,1.988,0,0,1,3.22-1.56L32.529,12.261a2.033,2.033,0,0,1,.763,1.56,1.98,1.98,0,0,1-.763,1.56L19.352,25.869A1.886,1.886,0,0,1,18.123,26.334Z"
                        transform="translate(-0.2 -1.311)"
                    />
                </svg>
            );
        default:
            return null
    }
};

export default Icons;