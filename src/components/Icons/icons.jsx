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
        case 'bottom-angle':
            return (
                <svg width={props.width || 10} height={props.height || 5} viewBox="0 0 10.313 5.681">
                    {
                        !props.className ?
                            <defs>
                                <style>{".bottom-angle{fill:#fff;stroke:#fff;stroke-width:0.6px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || 'bottom-angle'}
                        d="M4.842,218.588a.211.211,0,0,1-.149-.062L.059,213.892a.211.211,0,0,1,.3-.3l4.486,4.485,4.485-4.486a.211.211,0,0,1,.3.3l-4.635,4.635A.211.211,0,0,1,4.842,218.588Z"
                        transform="translate(0.3 -213.207)"
                    />
                </svg>
            );
        case 'top-angle':
            return (
                <svg width={props.width || 10} height={props.height || 5} viewBox="0 0 11.275 6.039">
                    {
                        !props.className ?
                            <defs>
                                <style>{".top-angle{fill:#434343;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "top-angle"}
                        d="M27.591,993.328a.6.6,0,0,0,.332-.163l5.011-4.81a.6.6,0,1,0-.827-.871l-4.6,4.416-4.6-4.416a.6.6,0,1,0-.827.871l5.011,4.81A.6.6,0,0,0,27.591,993.328Z"
                        transform="translate(33.147 993.333) rotate(180)"
                    />
                </svg>
            )
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
        case 'plus':
            return (
                <svg width={props.width || 12} height={props.height || 12} viewBox="0 0 12.548 12.548">
                    {
                        !props.className ?
                            <defs>
                                <style>{".plus{fill:#fff;stroke:#fff;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0.5 0.5)">
                        <g transform="translate(0 5.527)">
                            <path
                                className={props.className || 'plus'}
                                d="M14.11,48.4H3.058a.248.248,0,1,1,0-.5H14.11a.248.248,0,1,1,0,.5Z"
                                transform="translate(-2.81 -47.9)"
                            />
                        </g>
                        <g transform="translate(5.525 11.548) rotate(-90)">
                            <path
                                className={props.className || 'plus'}
                                d="M11.3.5H.248a.248.248,0,1,1,0-.5H11.3a.248.248,0,1,1,0,.5Z"
                                transform="translate(0 0)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'minus':
            return (
                <svg width={props.width || 12} height={props.height || 1} viewBox="0 0 12.548 1.497">
                    {
                        !props.className ?
                            <defs>
                                <style>{".minus{fill:#07f;stroke:#07f;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0.5 0.5)">
                        <path
                            className={props.className || 'minus'}
                            d="M14.11,48.4H3.058a.248.248,0,1,1,0-.5H14.11a.248.248,0,1,1,0,.5Z"
                            transform="translate(-2.81 -47.9)"
                        />
                    </g>
                </svg>
            );
        case 'letter':
            return (
                <svg width={props.width || 16} height={props.height || 13} viewBox="0 0 14.408 11.658">
                    {
                        !props.className ?
                            <defs>
                                <style>{".letter{fill: #444 !important;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "letter"}
                        d="M19.207,15.844a2.144,2.144,0,0,0-2.144-2.134H7.144A2.144,2.144,0,0,0,5,15.843v7.181a2.144,2.144,0,0,0,2.144,2.144h9.92a2.144,2.144,0,0,0,2.144-2.144v-7.18ZM5.952,14.662a1.679,1.679,0,0,1,1.192-.494h9.92a1.682,1.682,0,0,1,1.68,1.572l-5.7,4.1a1.6,1.6,0,0,1-1.874,0l-5.7-4.1A1.678,1.678,0,0,1,5.952,14.662Zm12.8,8.362a1.686,1.686,0,0,1-1.686,1.686H7.144a1.686,1.686,0,0,1-1.686-1.686V16.3L10.9,20.216a2.063,2.063,0,0,0,2.409,0L18.75,16.3Z"
                        transform="translate(-4.9 -13.61)"
                    />
                </svg>
            );
        case 'key':
            return (
                <svg width={props.width || 22} height={props.height || 19} viewBox="0 0 11.664 11.665">
                    {
                        !props.className ?
                            <defs>
                                <style>{".key{fill: #444 !important;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-2.072 -95.593)">
                        <path
                            className={props.className || "key"}
                            d="M108,95.959l-1.588-.259-4.82,4.822a3.452,3.452,0,1,0,1.847,1.847l1.128-1.127.288-1.13,1.193-.306.3-1.193,1.13-.288.778-.778Zm-5.6,9.894a3.037,3.037,0,1,1-.924-4.929l.066.03a3,3,0,0,1,.736.489l.05.045.07.069a0,0,0,0,1,0,0l.033.033.034.036.025.028.062.07s0,0,0,0l.021.025c.029.033.055.068.083.1a2.992,2.992,0,0,1,.339.555A3.043,3.043,0,0,1,102.4,105.853Zm4.863-7.9-1.256.321-.3,1.193-1.193.3-.321,1.256-.948.948q-.031-.054-.066-.107c-.012-.021-.026-.04-.039-.061s-.012-.019-.019-.029l-.029-.041a3.5,3.5,0,0,0-.4-.474,3.445,3.445,0,0,0-.715-.55h0l4.571-4.572,1.086.178.178,1.086Z"
                            transform="translate(-94.628)"
                        />
                        <path
                            className={props.className || "key"}
                            d="M208.655,674.463a.984.984,0,1,0,0,1.391A.984.984,0,0,0,208.655,674.463Zm-.282,1.109a.584.584,0,1,1,0-.827A.586.586,0,0,1,208.372,675.572Z"
                            transform="translate(-203.285 -570.505)"
                        />
                        <rect
                            className={props.className || "key"}
                            width={1.502}
                            height={0.413}
                            transform="translate(7.025 103.37) rotate(-135)"
                        />
                    </g>
                </svg>
            );
        case 'user':
            return (
                <svg width={props.width || 16} height={props.height || 13} viewBox="0 0 10.619 11.858">
                    {
                        !props.className ?
                            <defs>
                                <style>{".user{fill: #444 !important;stroke:#545454;stroke-width:0.4px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-33.3 -31.3)">
                        <g transform="translate(33.5 31.5)">
                            <path
                                className={props.className || "user"}
                                d="M43.719,42.8a.155.155,0,1,1-.31,0,4.8,4.8,0,0,0-9.6,0,.155.155,0,0,1-.31,0,5.11,5.11,0,0,1,10.219,0Zm-5.11-5.419a2.942,2.942,0,1,1,2.942-2.942A2.942,2.942,0,0,1,38.61,37.384Zm0-.31a2.632,2.632,0,1,0-2.632-2.632A2.632,2.632,0,0,0,38.61,37.074Z"
                                transform="translate(-33.5 -31.5)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'users':
            return (
                <svg width={props.width || 16} height={props.height || 13} viewBox="0 0 15.866 11.658">
                    {
                        !props.className ?
                            <defs>
                                <style>{".users{fill: #444 !important;stroke:#545454;stroke-width:0.4px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-1.9 -15.9)">
                        <g transform="translate(2 16)">
                            <g transform="translate(2.778 0)">
                                <path
                                    className={props.className || "users"}
                                    d="M20.778,22.25C19.141,22.25,18,20.42,18,18.778A2.63,2.63,0,0,1,20.778,16a2.63,2.63,0,0,1,2.778,2.778C23.555,20.42,22.415,22.25,20.778,22.25Zm0-5.9a2.278,2.278,0,0,0-2.431,2.431c0,1.478,1,3.125,2.431,3.125s2.43-1.647,2.43-3.125A2.278,2.278,0,0,0,20.778,16.347Z"
                                    transform="translate(-18 -16)"
                                />
                            </g>
                            <g transform="translate(0 6.423)">
                                <path
                                    className={props.className || "users"}
                                    d="M7.555,58.035C5.021,58.035,2,57.794,2,56.646,2,54.295,3.973,53,7.555,53s5.555,1.295,5.555,3.646C13.111,57.794,10.09,58.035,7.555,58.035Zm0-4.687c-1.945,0-5.208.428-5.208,3.3,0,.481,1.364,1.042,5.208,1.042s5.208-.561,5.208-1.042C12.764,53.776,9.5,53.347,7.555,53.347Z"
                                    transform="translate(-2 -53)"
                                />
                            </g>
                        </g>
                        <g transform="translate(11.333 16.347)">
                            <path
                                className={props.className || "users"}
                                d="M57.886,22.772a2.453,2.453,0,0,1-2.126-2.646,2.126,2.126,0,0,1,4.251,0A2.453,2.453,0,0,1,57.886,22.772Zm0-4.424a1.666,1.666,0,0,0-1.778,1.778c0,1.087.73,2.3,1.778,2.3s1.778-1.212,1.778-2.3A1.666,1.666,0,0,0,57.886,18.347Z"
                                transform="translate(-55.76 -18)"
                            />
                        </g>
                        <g transform="translate(11.796 21.509)">
                            <path
                                className={props.className || "users"}
                                d="M60.964,51.579l-.012-.347c2.213-.078,3-.438,3-.723,0-1.108-.67-2.429-3.86-2.429a7.625,7.625,0,0,0-1.59.15l-.073-.339a7.97,7.97,0,0,1,1.663-.157c2.713,0,4.208.986,4.208,2.776C64.3,51.141,63.176,51.5,60.964,51.579Z"
                                transform="translate(-58.427 -47.733)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'send':
            return (
                <svg width={props.width || 17.681} height={props.height || 15.82} viewBox="0 0 17.681 15.82">
                    {
                        !props.className ?
                            <defs>
                                <style>{".send{fill:#1a2a38;opacity:0.48;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0)">
                        <g transform="translate(0 0)">
                            <g transform="translate(0 0)">
                                <path
                                    className={props.className || "send"}
                                    d="M15.743,7.841.914,1.261,2.187,6.35,8.636,7.359a.492.492,0,0,1,0,.965L2.187,9.377.914,14.422ZM.388-.011,17.1,7.4a.473.473,0,0,1,0,.877L.432,15.694a.482.482,0,0,1-.7-.526L1.353,8.807A.476.476,0,0,1,1.7,8.456l3.817-.614-3.773-.57a.519.519,0,0,1-.395-.395L-.27.559A.486.486,0,0,1,.388-.011Z"
                                    transform="translate(0.282 0.058)"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'print':
            return (
                <svg width={props.width || 18.728} height={props.height || 16.876} viewBox="0 0 18.728 16.876">
                    {
                        !props.className ?
                            <defs>
                                <style>
                                    {".print{fill:#1a2a38;stroke:#1a2a38;stroke-width:0.2px;opacity:0.48;}"}
                                </style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0.099 0.1)">
                        <g transform="translate(0.001 0)">
                            <path
                                className={props.className || "print"}
                                d="M22.264,14.759h-.683v-2.5a.2.2,0,0,0,0-.151v-.424c0-.637-1.144-1.988-1.375-2.251-.424-.484-1.462-1.6-2.062-1.6H10.972A1.557,1.557,0,0,0,9.387,9.35v5.408H9a2.667,2.667,0,0,0-2.661,2.6v4.6a.212.212,0,0,0,.212.212H9.387v.743A1.57,1.57,0,0,0,10.972,24.5H20a1.57,1.57,0,0,0,1.585-1.587v-.743h3.074a.212.212,0,0,0,.212-.212v-4.6A2.606,2.606,0,0,0,22.264,14.759Zm-1.108,8.158A1.137,1.137,0,0,1,20,24.08H10.972a1.137,1.137,0,0,1-1.161-1.163v-.743H21.157Zm0-11.233v.289H18.413V8.349c.855.49,2.743,2.71,2.743,3.335ZM9.811,9.35a1.135,1.135,0,0,1,1.161-1.1h7.017v3.936a.212.212,0,0,0,.212.212h2.956v2.362H9.811Zm14.64,12.4H6.764V17.36A2.238,2.238,0,0,1,9,15.183H22.264a2.181,2.181,0,0,1,2.179,2.177Z"
                                transform="translate(-6.34 -7.829)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'paper-list':
            return (
                <svg width={props.width || 12.129} height={props.height || 16.676} viewBox="0 0 12.129 16.676">
                    {
                        !props.className ?
                            <defs>
                                <style>{".paper-list{fill:#1a2a38;opacity:0.48;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0.001)">
                        <g transform="translate(-0.001)">
                            <path
                                className={props.className || "paper-list"}
                                d="M29.233,22.426H20.9a1.9,1.9,0,0,1-1.9-1.9V7.646a1.9,1.9,0,0,1,1.9-1.9h8.337a1.9,1.9,0,0,1,1.9,1.9V20.53A1.9,1.9,0,0,1,29.233,22.426ZM20.9,6.511a1.136,1.136,0,0,0-1.135,1.135V20.53A1.137,1.137,0,0,0,20.9,21.666h8.337a1.137,1.137,0,0,0,1.135-1.135V7.646a1.136,1.136,0,0,0-1.135-1.135Zm7.579,12.505H21.654v-.761h6.821Zm0-2.274H21.654v-.761h6.821Zm0-2.274H21.654v-.761h6.821Zm0-2.273H21.654v-.761h6.821Z"
                                transform="translate(-19 -5.75)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'export':
            return (
                <svg width={props.width || 23.155} height={props.height || 12.187} viewBox="0 0 23.155 12.187">
                    {
                        !props.className ?
                            <defs>
                                <style>{".export{fill:#8d969f;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0)">
                        <g transform="translate(0)">
                            <path
                                className={props.className || "export"}
                                d="M45.83,42.2l2.625-2.625L45.83,37l-.656.656,1.453,1.453H30.315a5.039,5.039,0,0,0,0,10.077h15v-.937h-15a4.078,4.078,0,0,1,0-8.156H46.627l-1.453,1.453Z"
                                transform="translate(-25.3 -37)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'triangle-up':
            return (
                <svg width={props.width || 4.799} height={props.height || 2.751} viewBox="0 0 4.799 2.751">
                    {
                        !props.className ?
                            <defs>
                                <style>{".triangle-up{fill:#5d5d5d;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "triangle-up"}
                        d="M2.286,4.723.084,2.6a.275.275,0,0,1,0-.4L2.286.076a.275.275,0,0,1,.465.2V4.525a.275.275,0,0,1-.465.2Z"
                        transform="translate(4.799) rotate(90)"
                    />
                </svg>
            );
        case 'triangle-down':
            return (
                <svg width={props.width || 4.799} height={props.height || 2.751} viewBox="0 0 4.799 2.751">
                    {
                        !props.className ?
                            <defs>
                                <style>{".triangle-down{fill:#5d5d5d;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "triangle-down"}
                        d="M2.286,4.723.084,2.6a.275.275,0,0,1,0-.4L2.286.076a.275.275,0,0,1,.465.2V4.525a.275.275,0,0,1-.465.2Z"
                        transform="translate(0 2.751) rotate(-90)"
                    />
                </svg>
            );
        case 'code':
            return (
                <svg width={props.width || 20} height={props.height || 13} viewBox="0 0 15.158 13.087">
                    {
                        !props.className ?
                            <defs>
                                <style>{".code{fill:none;stroke:#757575;stroke-width:0.5px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0.33 0.253)">
                        <g transform="translate(0 0)">
                            <path
                                className="code"
                                d="M57.221,58.578a1.069,1.069,0,0,1-.755-1.825l1.581-1.584-1.581-1.584a1.069,1.069,0,1,1,1.512-1.512l2.339,2.34a1.069,1.069,0,0,1,0,1.512l-2.339,2.34A1.064,1.064,0,0,1,57.221,58.578Z"
                                transform="translate(-46.053 -48.547)"
                            />
                            <path
                                className={props.className || "code"}
                                d="M38.3,58.584a1.072,1.072,0,0,1-.757-.313l-2.339-2.344a1.07,1.07,0,0,1,0-1.51l2.339-2.337a1.069,1.069,0,0,1,1.512,1.512l-1.584,1.581,1.584,1.587a1.069,1.069,0,0,1-.757,1.825Z"
                                transform="translate(-34.895 -48.551)"
                            />
                            <path
                                className="code"
                                d="M46.191,57.583a1.067,1.067,0,0,1-1.035-1.337L47.878,45.8a1.069,1.069,0,1,1,2.068.539L47.224,56.782A1.07,1.07,0,0,1,46.191,57.583Z"
                                transform="translate(-40.262 -44.999)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'barcode':
            return (
                <svg width={props.width || 20} height={props.height || 13} viewBox="0 0 19.005 13.084">
                    {
                        !props.className ?
                            <defs>
                                <style>{".barcode{fill:none;stroke:#757575;stroke-width:0.5px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0.25 0.25)">
                        <g transform="translate(0 0)">
                            <path
                                className={props.className || "barcode"}
                                d="M21.3,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.607.607,0,0,0,21.3,17.7Z"
                                transform="translate(-17.155 -17.7)"
                            />
                            <path
                                className={props.className || "barcode"}
                                d="M36.754,17.7h-1.87a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h1.87a.586.586,0,0,0,.584-.584V18.284A.574.574,0,0,0,36.754,17.7Z"
                                transform="translate(-28.106 -17.7)"
                            />
                            <path
                                className={props.className || "barcode"}
                                d="M57.9,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.6.6,0,0,0,57.9,17.7Z"
                                transform="translate(-46.625 -17.7)"
                            />
                            <path
                                className={props.className || "barcode"}
                                d="M71.6,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.607.607,0,0,0,71.6,17.7Z"
                                transform="translate(-57.657 -17.7)"
                            />
                            <path
                                className={props.className || "barcode"}
                                d="M86.528,17.7H85.184a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h1.344a.586.586,0,0,0,.584-.584V18.284A.574.574,0,0,0,86.528,17.7Z"
                                transform="translate(-68.608 -17.7)"
                            />
                            <path
                                className={props.className || "barcode"}
                                d="M4.019,17.7H3.084a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h.935A.586.586,0,0,0,4.6,29.7V18.284A.586.586,0,0,0,4.019,17.7Z"
                                transform="translate(-2.5 -17.7)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'text':
            return (
                <svg width={props.width || 20} height={props.height || 13} viewBox="0 0 20.634 13.084">
                    {
                        !props.className ?
                            <defs>
                                <style>{".text{fill:none;stroke:#000;stroke-width:0.5px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0.25 0.25)">
                        <g transform="translate(0 0)">
                            <path
                                className={props.className || "text"}
                                d="M14.067,9H5.258A1.259,1.259,0,0,0,4,10.258v1.888a1.258,1.258,0,1,0,2.517,0v-.629H8.4v7.55H7.775a1.258,1.258,0,0,0,0,2.517H11.55a1.258,1.258,0,0,0,0-2.517h-.629v-7.55h1.888v.629a1.258,1.258,0,1,0,2.517,0V10.258A1.259,1.259,0,0,0,14.067,9Z"
                                transform="translate(-4 -9)"
                            />
                        </g>
                        <g transform="translate(13.842 0)">
                            <path
                                className={props.className || "text"}
                                d="M20.033,11.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                transform="translate(-15 -9)"
                            />
                        </g>
                        <g transform="translate(13.842 5.033)">
                            <path
                                className={props.className || "text"}
                                d="M20.033,15.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                transform="translate(-15 -13)"
                            />
                        </g>
                        <g transform="translate(13.842 10.067)">
                            <path
                                className={props.className || "text"}
                                d="M20.033,19.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                transform="translate(-15 -17)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'bell':
            return (
                <svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24.456 22.766">
                    {
                        !props.className ?
                            <defs>
                                <style>{".bell{fill:#fff;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0 0.001)">
                        <g transform="translate(0 -0.001)">
                            <path
                                className={props.className || "bell"}
                                d="M12.238,0a8.927,8.927,0,0,1,8.9,8.9v8.8h2.539a.8.8,0,0,1,0,1.6h-7.2A4.326,4.326,0,0,1,8,19.3H.8a.8.8,0,0,1,0-1.6H3.338V8.9A8.923,8.923,0,0,1,12.238,0Zm2.594,19.3H9.644A2.73,2.73,0,0,0,14.832,19.3ZM4.941,17.7H19.535V8.9a7.3,7.3,0,0,0-14.594,0v8.8Z"
                                transform="translate(-0.01)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'chat':
            return (
                <svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24.164 24.164">
                    {
                        !props.className ?
                            <defs>
                                <style>{".chat{fill:#fff;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "chat"}
                        d="M48.529,58.761H38.3V48.535A10.227,10.227,0,1,1,48.529,58.761Zm0-22.311A12.094,12.094,0,0,0,36.45,48.535V59.689a.924.924,0,0,0,.925.925H48.529a12.082,12.082,0,1,0,0-24.164Z"
                        transform="translate(-36.45 -36.45)"
                    />
                </svg>
            );
        case 'person':
            return (
                <svg width={props.width || 24} height={props.height || 24} viewBox="0 0 18.977 25.264">
                    {
                        !props.className ?
                            <defs>
                                <style>{".person{fill:#fff;stroke:#fff;stroke-width:0.1px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(2.209 2.05)">
                        <g transform="translate(-2.159 -2)">
                            <path
                                className={props.className || "person"}
                                d="M55.035,0A5.062,5.062,0,1,1,50,5.035,5.029,5.029,0,0,1,55.035,0Zm0,1.232a3.8,3.8,0,1,0,3.8,3.8A3.817,3.817,0,0,0,55.035,1.232Z"
                                transform="translate(-45.596)"
                            />
                            <path
                                className={props.className || "person"}
                                d="M4.195,198H14.682a3.957,3.957,0,0,1,4.195,3.692v6.058a4,4,0,0,1-4.195,3.692H4.195A4,4,0,0,1,0,207.75v-6.058A3.957,3.957,0,0,1,4.195,198Zm10.487,1.327H4.195a2.555,2.555,0,0,0-2.687,2.365v6.058a2.555,2.555,0,0,0,2.687,2.365H14.682a2.555,2.555,0,0,0,2.687-2.365v-6.058A2.555,2.555,0,0,0,14.682,199.327Z"
                                transform="translate(0 -186.278)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'own-page':
            return (
                <svg width={props.width || 21} height={props.height || 21} viewBox="0 0 21.005 21.005">
                    {
                        !props.className ?
                            <defs>
                                <style>{".own-page{fill:#3b3b3b;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-5 -5)">
                        <path
                            className={props.className || "own-page"}
                            d="M15.5,5A10.5,10.5,0,1,0,26,15.5,10.5,10.5,0,0,0,15.5,5ZM9.714,22.635a7.87,7.87,0,0,1,11.574,0A9.165,9.165,0,0,1,9.714,22.635Zm12.533-.9a9.181,9.181,0,0,0-13.487,0,9.191,9.191,0,1,1,13.487,0Z"
                        />
                        <path
                            className={props.className || "own-page"}
                            d="M34.905,21.88a4.6,4.6,0,1,0,4.6,4.593A4.6,4.6,0,0,0,34.905,21.88Zm0,7.877a3.281,3.281,0,1,1,3.281-3.284,3.281,3.281,0,0,1-3.281,3.284Z"
                            transform="translate(-19.403 -12.94)"
                        />
                    </g>
                </svg>
            );
        case 'configuration':
            return (
                <svg width={props.width || 21} height={props.height || 21} viewBox="0 0 21.005 20.976">
                    {
                        !props.className ?
                            <defs>
                                <style>{".configuration{fill:#3b3b3b;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-4.2 -4.225)">
                        <g transform="translate(4.2 4.225)">
                            <path
                                className={props.className || "configuration"}
                                d="M24.953,12.456l-.458-.046c-.435-.046-.938-.092-1.487-.114a10.091,10.091,0,0,0-.732-1.785c.366-.412.686-.8.961-1.144l.275-.343-.252-.366A10.486,10.486,0,0,0,20.7,6.1l-.366-.252-.343.275c-.343.275-.732.618-1.144.961a8.618,8.618,0,0,0-1.785-.732,13.947,13.947,0,0,0-.092-1.464l-.046-.435-.435-.069a10.789,10.789,0,0,0-3.638,0l-.435.069-.023.435c-.046.435-.092.938-.114,1.487a10.091,10.091,0,0,0-1.785.732c-.412-.366-.8-.686-1.144-.961l-.343-.275-.366.252A10.486,10.486,0,0,0,6.076,8.681l-.252.366L6.1,9.39c.275.343.618.732.961,1.144a8.618,8.618,0,0,0-.732,1.785,13.947,13.947,0,0,0-1.464.092l-.435.046-.069.435A9.825,9.825,0,0,0,4.2,14.7a9.654,9.654,0,0,0,.16,1.808l.069.435.435.046c.435.046.938.092,1.487.114a10.091,10.091,0,0,0,.732,1.785c-.366.412-.686.8-.961,1.144l-.275.343.252.366A10.486,10.486,0,0,0,8.662,23.3l.366.252.343-.275c.343-.3.732-.618,1.144-.961a8.618,8.618,0,0,0,1.785.732c.046.549.069,1.053.114,1.487l.046.435.435.069a9.825,9.825,0,0,0,1.808.16,9.654,9.654,0,0,0,1.808-.16l.435-.069.046-.435c.046-.435.092-.938.114-1.487a10.091,10.091,0,0,0,1.785-.732c.412.366.8.686,1.144.961l.343.275.366-.252a10.486,10.486,0,0,0,2.563-2.563l.252-.366-.275-.343c-.275-.343-.618-.732-.961-1.144a8.618,8.618,0,0,0,.732-1.785c.549-.046,1.053-.069,1.487-.114l.435-.046.069-.435A9.825,9.825,0,0,0,25.2,14.7a9.654,9.654,0,0,0-.16-1.808Zm-1.007,3.432c-.435.046-.915.069-1.419.092L22.093,16,22,16.438a7.843,7.843,0,0,1-.915,2.219l-.229.366.275.32c.343.389.664.755.938,1.075a9.617,9.617,0,0,1-1.67,1.67c-.343-.275-.686-.595-1.075-.938L19,20.877l-.366.229a7.23,7.23,0,0,1-2.219.915l-.412.092-.023.435c-.023.5-.069.984-.092,1.419a10.346,10.346,0,0,1-2.38,0c-.046-.435-.069-.915-.092-1.419l-.023-.435-.458-.092a7.843,7.843,0,0,1-2.219-.915l-.366-.229-.32.275c-.389.343-.755.664-1.075.938a9.616,9.616,0,0,1-1.67-1.67c.275-.32.595-.686.938-1.075l.275-.32-.229-.366a7.23,7.23,0,0,1-.915-2.219l-.092-.412L6.831,16c-.5-.023-.984-.069-1.419-.092a10.372,10.372,0,0,1-.069-1.19,10.677,10.677,0,0,1,.069-1.19c.435-.046.915-.069,1.419-.092l.435-.023.092-.412a7.843,7.843,0,0,1,.915-2.219L8.5,10.42l-.275-.32c-.343-.389-.664-.755-.938-1.075a9.616,9.616,0,0,1,1.67-1.67c.32.275.686.595,1.075.938l.32.275.366-.229a7.23,7.23,0,0,1,2.219-.915l.412-.092.023-.435c.023-.5.069-.984.092-1.419a10.346,10.346,0,0,1,2.38,0c.046.435.069.915.092,1.419l.023.435.412.092a7.843,7.843,0,0,1,2.219.915l.366.229.32-.275c.389-.343.755-.664,1.075-.938a9.617,9.617,0,0,1,1.67,1.67c-.275.32-.595.686-.938,1.075l-.229.275.229.366A7.23,7.23,0,0,1,22,12.96l.092.412.435.023c.5.023.984.069,1.419.092a10.372,10.372,0,0,1,.069,1.19A10.772,10.772,0,0,1,23.946,15.889Z"
                                transform="translate(-4.2 -4.225)"
                            />
                            <path
                                className={props.className || "configuration"}
                                d="M30.489,24.7a5.789,5.789,0,1,0,5.789,5.789A5.8,5.8,0,0,0,30.489,24.7Zm0,10.411a4.622,4.622,0,1,1,4.622-4.622A4.639,4.639,0,0,1,30.489,35.111Z"
                                transform="translate(-20.009 -20.015)"
                            />
                        </g>
                    </g>
                </svg>
            );
        case 'exit':
            return (
                <svg width={props.width || 21} height={props.height || 21} viewBox="0 0 20.205 23.455">
                    {
                        !props.className ?
                            <defs>
                                <style>{".logoutIcon{fill:#3b3b3b;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-11.236 -5)">
                        <path
                            className={props.className || "exit"}
                            d="M25.526,18.6a.505.505,0,0,0-.505.505v4.686a.506.506,0,0,1-.506.505H21.207V9.71a1.686,1.686,0,0,0-1.032-1.5l-5.712-2.2H24.515a.506.506,0,0,1,.505.505V11.2a.505.505,0,1,0,1.01,0V6.516A1.517,1.517,0,0,0,24.515,5H11.742a.647.647,0,0,0-.067.007c-.014,0-.027,0-.04.005a.452.452,0,0,0-.048.015.464.464,0,0,0-.045.015c-.015.007-.028.015-.042.023s-.029.015-.042.024a.507.507,0,0,0-.041.034c-.011.009-.023.018-.033.028a.465.465,0,0,0-.032.039c-.01.012-.021.024-.03.038s-.013.025-.02.037a.476.476,0,0,0-.027.053.307.307,0,0,0-.013.041.556.556,0,0,0-.015.055.463.463,0,0,0-.006.056c0,.012,0,.024,0,.036V24.8a.639.639,0,0,0,.007.067c0,.013,0,.028.005.04a.433.433,0,0,0,.015.047c.005.016.009.032.016.047s.014.026.021.038a.442.442,0,0,0,.026.046.407.407,0,0,0,.03.036.456.456,0,0,0,.033.038.385.385,0,0,0,.034.028.452.452,0,0,0,.043.034.277.277,0,0,0,.032.017.567.567,0,0,0,.058.029l8.022,3.086a1.389,1.389,0,0,0,.5.1,1.115,1.115,0,0,0,.636-.192,1.21,1.21,0,0,0,.5-1.024v-1.93h3.308a1.518,1.518,0,0,0,1.516-1.516V19.106A.5.5,0,0,0,25.526,18.6Zm-5.33,0v8.638h0a.16.16,0,0,1-.257.176l-7.692-2.959V6.242l7.565,2.909a.7.7,0,0,1,.384.559Z"
                        />
                        <path
                            className={props.className || "exit"}
                            d="M65.9,33.23l-2.91-2.91a.505.505,0,1,0-.715.715L64.5,33.261H58.642a.505.505,0,0,0,0,1.011H64.5L62.272,36.5a.505.505,0,1,0,.715.715L65.9,34.3a.758.758,0,0,0,0-1.072Z"
                            transform="translate(-34.678 -18.612)"
                        />
                    </g>
                </svg>
            );
        case 'product':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 26.664 25.655">
                    {
                        !props.className ?
                            <defs>
                                <style>{".product{fill:#171717;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "product"}
                        d="M31.971,10.469a.448.448,0,0,0-.34-.156H10.466L9.6,7.42a.449.449,0,0,0-.43-.32H5.864a.449.449,0,0,0,0,.9H8.839l5.452,18.271,0,.006.677,2.3a2.345,2.345,0,1,0,3.993,1.782h5.878c0,.016,0,.033,0,.049a2.352,2.352,0,1,0,.2-.946H18.836a2.34,2.34,0,0,0-2.209-1.568h0a2.329,2.329,0,0,0-.87.169l-.434-1.475H29.278a.448.448,0,0,0,.443-.381l2.352-15.38A.448.448,0,0,0,31.971,10.469ZM27.186,28.96a1.449,1.449,0,1,1-1.448,1.449A1.451,1.451,0,0,1,27.186,28.96Zm-10.56-.169h0a1.448,1.448,0,0,1,1.446,1.448,1.448,1.448,0,1,1-1.447-1.448Zm12.267-3.1H15.058l-.848-2.885a.448.448,0,0,0-.045-.1l-3.431-11.5H31.108Z"
                        transform="translate(-5.415 -7.1)"
                    />
                </svg>
            );
        case 'document':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 22.314 26.458">
                    {
                        !props.className ?
                            <defs>
                                <style>{".document{fill:#171717;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-40.097)">
                        <g transform="translate(40.097)">
                            <path
                                className={props.className || "document"}
                                d="M61.136,3.506H58.9V1.275A1.279,1.279,0,0,0,57.63,0H41.372A1.279,1.279,0,0,0,40.1,1.275v20.4a1.279,1.279,0,0,0,1.275,1.275H43.6v2.231a1.279,1.279,0,0,0,1.275,1.275H55.716a3.72,3.72,0,0,0,2.2-.874l3.562-3.353a3.386,3.386,0,0,0,.929-2.149V4.782A1.279,1.279,0,0,0,61.136,3.506ZM43.6,4.782V22H41.372a.323.323,0,0,1-.319-.319V1.275a.323.323,0,0,1,.319-.319H57.63a.323.323,0,0,1,.319.319V3.507H44.879A1.279,1.279,0,0,0,43.6,4.782ZM60.826,21.535l-3.562,3.353a1.692,1.692,0,0,1-.273.2V22.155a.8.8,0,0,1,.8-.8h3.189A1.339,1.339,0,0,1,60.826,21.535Zm.628-1.453a1.487,1.487,0,0,1-.043.319H57.788a1.757,1.757,0,0,0-1.753,1.753v3.308a1.667,1.667,0,0,1-.319.039H44.879a.323.323,0,0,1-.319-.319V4.782a.323.323,0,0,1,.319-.319H61.136a.323.323,0,0,1,.319.319Z"
                                transform="translate(-40.097)"
                            />
                        </g>
                        <g transform="translate(47.907 7.969)">
                            <g transform="translate(0)">
                                <path
                                    className={props.className || "document"}
                                    d="M200.957,154.216h-9.244a.478.478,0,0,0,0,.956h9.244a.478.478,0,1,0,0-.956Z"
                                    transform="translate(-191.235 -154.216)"
                                />
                            </g>
                        </g>
                        <g transform="translate(47.907 14.345)">
                            <g transform="translate(0)">
                                <path
                                    className={props.className || "document"}
                                    d="M200.957,277.59h-9.244a.478.478,0,1,0,0,.956h9.244a.478.478,0,1,0,0-.956Z"
                                    transform="translate(-191.235 -277.59)"
                                />
                            </g>
                        </g>
                        <g transform="translate(47.907 17.532)">
                            <g transform="translate(0)">
                                <path
                                    className={props.className || "document"}
                                    d="M196.814,339.277h-5.1a.478.478,0,0,0,0,.956h5.1a.478.478,0,0,0,0-.956Z"
                                    transform="translate(-191.236 -339.277)"
                                />
                            </g>
                        </g>
                        <g transform="translate(47.907 11.157)">
                            <g transform="translate(0)">
                                <path
                                    className={props.className || "document"}
                                    d="M200.957,215.9h-9.244a.478.478,0,0,0,0,.956h9.244a.478.478,0,1,0,0-.956Z"
                                    transform="translate(-191.235 -215.903)"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'sell':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 26.997 26.655">
                    {
                        !props.className ?
                            <defs>
                                <style>{".sell{fill:#171717;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-10.5 -2.5)">
                        <path
                            className={props.className || "sell"}
                            d="M36.984,36.029H35.447V15.013a.513.513,0,0,0-.513-.513H30.15a.513.513,0,0,0-.513.513V36.029H26.9V22.873a.513.513,0,0,0-.513-.513H21.606a.513.513,0,0,0-.513.513V36.029H18.36V30.391a.513.513,0,0,0-.513-.513H13.063a.513.513,0,0,0-.513.513v5.639H11.013a.513.513,0,1,0,0,1.025H36.984a.513.513,0,0,0,0-1.025Zm-6.322-20.5h3.759v20.5H30.662Zm-8.543,7.86h3.759V36.029H22.119ZM13.576,30.9h3.759v5.126H13.576Z"
                            transform="translate(0 -7.899)"
                        />
                        <path
                            className={props.className || "sell"}
                            d="M12.013,18.562a.513.513,0,0,0,.362-.15L26.537,4.25V6.43a.513.513,0,1,0,1.025,0V3.013a.509.509,0,0,0-.038-.188h0a.513.513,0,0,0-.28-.28h0A.509.509,0,0,0,27.05,2.5H23.632a.513.513,0,0,0,0,1.025h2.18L11.651,17.687a.513.513,0,0,0,.362.875Z"
                            transform="translate(-0.659)"
                        />
                    </g>
                </svg>
            );
        case 'finance':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 22.825 26.746">
                    {
                        !props.className ?
                            <defs>
                                <style>{".a{fill:#171717;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-12.529 -4.5)">
                        <path
                            className={props.className || "finance"}
                            d="M28.748,10.4l.9-4.12A.451.451,0,0,0,28.97,5.8a5.708,5.708,0,0,1-2.777.568,3.022,3.022,0,0,1-1.929-.811A4.171,4.171,0,0,0,21.56,4.5a3.649,3.649,0,0,0-3.306,1.464.451.451,0,0,0-.045.316l.9,4.12C17.9,11.947,9.665,22.663,13.572,27.507c3.005,3.738,7.57,3.735,10.278,3.738h.276c2.729,0,7.212-.042,10.187-3.738C38.214,22.663,29.977,11.947,28.748,10.4Zm4.865,16.528c-2.7,3.363-6.912,3.4-9.49,3.4h-.273c-2.557,0-6.84,0-9.58-3.4-1.878-2.317-.27-6.539,1.406-9.656a46.46,46.46,0,0,1,4.285-6.461.451.451,0,0,0,.09-.382l-.9-4.132a3.04,3.04,0,0,1,2.4-.881,3.348,3.348,0,0,1,2.167.878,3.913,3.913,0,0,0,2.467.989,8.009,8.009,0,0,0,2.4-.337l-.769,3.486a.451.451,0,0,0,.09.382A46.405,46.405,0,0,1,32.2,17.248c1.674,3.134,3.288,7.36,1.409,9.695Z"
                            transform="translate(0)"
                        />
                        <path
                            className={props.className || "finance"}
                            d="M45.909,44.756a.451.451,0,1,0,.9,0,2.882,2.882,0,0,0-2.7-2.675v-.631a.451.451,0,1,0-.9,0v.631a2.673,2.673,0,1,0,0,5.346v3.606a1.966,1.966,0,0,1-1.8-1.767.451.451,0,1,0-.9,0,2.879,2.879,0,0,0,2.7,2.675v.631a.451.451,0,1,0,.9,0v-.634a2.673,2.673,0,1,0,0-5.346V42.986A1.967,1.967,0,0,1,45.909,44.756Zm-4.508,0a1.961,1.961,0,0,1,1.8-1.767v3.534A1.961,1.961,0,0,1,41.4,44.756Zm4.508,4.508a1.959,1.959,0,0,1-1.8,1.767V47.5a1.961,1.961,0,0,1,1.8,1.764Z"
                            transform="translate(-19.566 -25.531)"
                        />
                        <path
                            className={props.className || "finance"}
                            d="M40.824,24.383a11.438,11.438,0,0,0,5.361,0,.451.451,0,1,0-.252-.865,10.577,10.577,0,0,1-4.856,0,.451.451,0,0,0-.252.865Z"
                            transform="translate(-19.565 -13.29)"
                        />
                    </g>
                </svg>
            );
        case 'accounting':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 26.655 26.655">
                    {
                        !props.className ?
                            <defs>
                                <style>{".accounting{fill:#171717;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-10.5 -10.5)">
                        <path
                            className={props.className || "accounting"}
                            d="M31.926,10.5H15.73a5.237,5.237,0,0,0-5.23,5.23v16.2a5.237,5.237,0,0,0,5.23,5.23h16.2a5.237,5.237,0,0,0,5.23-5.23V15.73A5.237,5.237,0,0,0,31.926,10.5Zm4.218,5.23v7.592H24.334V11.512h7.592A4.221,4.221,0,0,1,36.143,15.73ZM15.73,11.512h7.592V23.322H11.512V15.73A4.221,4.221,0,0,1,15.73,11.512ZM11.512,31.926V24.334H23.322V36.143H15.73A4.221,4.221,0,0,1,11.512,31.926Zm20.413,4.218H24.334V24.334H36.143v7.592A4.221,4.221,0,0,1,31.926,36.143Z"
                        />
                        <path
                            className={props.className || "accounting"}
                            d="M22.006,26.212H24.2V28.4a.506.506,0,0,0,1.012,0V26.212H27.4a.506.506,0,0,0,0-1.012H25.212V23.006a.506.506,0,1,0-1.012,0V25.2H22.006a.506.506,0,1,0,0,1.012Z"
                            transform="translate(-7.288 -7.951)"
                        />
                        <path
                            className={props.className || "accounting"}
                            d="M60.006,31.512h5.4a.506.506,0,1,0,0-1.012h-5.4a.506.506,0,1,0,0,1.012Z"
                            transform="translate(-32.467 -13.252)"
                        />
                        <path
                            className={props.className || "accounting"}
                            d="M65.4,66.5h-5.4a.506.506,0,1,0,0,1.012h5.4a.506.506,0,1,0,0-1.012Z"
                            transform="translate(-32.467 -37.105)"
                        />
                        <path
                            className={props.className || "accounting"}
                            d="M27.721,63.055l1.667-1.667a.506.506,0,0,0-.715-.715L27.006,62.34l-1.667-1.667a.506.506,0,0,0-.715.715l1.667,1.667-1.667,1.667a.506.506,0,1,0,.715.715l1.667-1.667,1.667,1.667a.506.506,0,0,0,.715-.715Z"
                            transform="translate(-9.251 -33.154)"
                        />
                        <circle
                            className={props.className || "accounting"}
                            cx={0.675}
                            cy={0.675}
                            r={0.675}
                            transform="translate(29.564 27.202)"
                        />
                        <circle
                            className={props.className || "accounting"}
                            cx={0.675}
                            cy={0.675}
                            r={0.675}
                            transform="translate(29.564 31.251)"
                        />
                    </g>
                </svg>
            );
        case 'suppliers':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 26.056 26.655">
                    {
                        !props.className ?
                            <defs>
                                <style>{".suppliers{fill:#171717;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-6.5 -1.5)">
                        <path
                            className={props.className || "suppliers"}
                            d="M35.64,68.5a6.146,6.146,0,0,0-6.14,6.14.449.449,0,0,0,.449.449H41.33a.449.449,0,0,0,.449-.449A6.146,6.146,0,0,0,35.64,68.5Zm-5.223,5.69a5.241,5.241,0,0,1,10.444,0Z"
                            transform="translate(-16.112 -46.934)"
                        />
                        <path
                            className={props.className || "suppliers"}
                            d="M42.645,50.789A3.145,3.145,0,1,0,39.5,47.645,3.145,3.145,0,0,0,42.645,50.789Zm0-5.391A2.246,2.246,0,1,1,40.4,47.645,2.246,2.246,0,0,1,42.645,45.4Z"
                            transform="translate(-23.117 -30.122)"
                        />
                        <path
                            className={props.className || "suppliers"}
                            d="M67.131,51.5a6.2,6.2,0,0,0-2.357.449.449.449,0,1,0,.338.833,5.307,5.307,0,0,1,2.019-.383,5.07,5.07,0,0,1,5.13,4.492H65.14a.449.449,0,1,0,0,.9h7.592a.449.449,0,0,0,.449-.449A5.955,5.955,0,0,0,67.131,51.5Z"
                            transform="translate(-40.625 -35.025)"
                        />
                        <path
                            className={props.className || "suppliers"}
                            d="M65.645,32.789A3.145,3.145,0,1,0,62.5,29.645,3.145,3.145,0,0,0,65.645,32.789Zm0-5.391A2.246,2.246,0,1,1,63.4,29.645,2.246,2.246,0,0,1,65.645,27.4Z"
                            transform="translate(-39.228 -17.513)"
                        />
                        <path
                            className={props.className || "suppliers"}
                            d="M14.883,57.326a.449.449,0,0,0-.446-.449H7.419a5.082,5.082,0,0,1,5.133-4.492,5.319,5.319,0,0,1,2.013.389.452.452,0,0,0,.338-.839,6.212,6.212,0,0,0-2.351-.455A5.966,5.966,0,0,0,6.5,57.326a.449.449,0,0,0,.449.449h7.487A.449.449,0,0,0,14.883,57.326Z"
                            transform="translate(0 -35.011)"
                        />
                        <path
                            className={props.className || "suppliers"}
                            d="M19.645,32.789A3.145,3.145,0,1,0,16.5,29.645,3.145,3.145,0,0,0,19.645,32.789Zm0-5.391A2.246,2.246,0,1,1,17.4,29.645,2.246,2.246,0,0,1,19.645,27.4Z"
                            transform="translate(-7.005 -17.513)"
                        />
                        <path
                            className={props.className || "suppliers"}
                            d="M42.4,8.167a.449.449,0,1,0-.9,0,2.3,2.3,0,0,0,2.1,2.141v.626a.449.449,0,0,0,.9,0v-.623a2.3,2.3,0,0,0,2.1-2.141,2.3,2.3,0,0,0-2.1-2.141V3.486a1.376,1.376,0,0,1,1.2,1.231.449.449,0,1,0,.9,0,2.3,2.3,0,0,0-2.1-2.141V1.949a.449.449,0,1,0-.9,0v.623a2.3,2.3,0,0,0-2.1,2.141,2.3,2.3,0,0,0,2.1,2.138V9.4A1.379,1.379,0,0,1,42.4,8.167Zm3.294,0a1.365,1.365,0,0,1-1.2,1.231V6.939A1.378,1.378,0,0,1,45.693,8.167ZM42.4,4.714a1.365,1.365,0,0,1,1.2-1.231V5.939a1.37,1.37,0,0,1-1.2-1.225Z"
                            transform="translate(-24.518)"
                        />
                    </g>
                </svg>
            );
        case 'report:':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 28.458 28.427">
                    {
                        !props.className ?
                            <defs>
                                <style>{".report{fill:#171717;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(0 -0.277)">
                        <g transform="translate(0 0.277)">
                            <g transform="translate(0 0)">
                                <path
                                    className={props.className || "report"}
                                    d="M19.425,15.438a.474.474,0,0,0-.474.474V27.282a.474.474,0,0,1-.474.474H1.421a.474.474,0,0,1-.474-.474V1.7a.474.474,0,0,1,.474-.474H18.477a.474.474,0,0,1,.474.474V4.541a.474.474,0,0,0,.948,0V1.7A1.421,1.421,0,0,0,18.477.277H1.421A1.421,1.421,0,0,0,0,1.7V27.282A1.421,1.421,0,0,0,1.421,28.7H18.477A1.421,1.421,0,0,0,19.9,27.282V15.912A.474.474,0,0,0,19.425,15.438Z"
                                    transform="translate(0 -0.277)"
                                />
                                <path
                                    className={props.className || "report"}
                                    d="M75.282,17.2a2.369,2.369,0,0,0-3.343-.007h0l-3.119,3.119L52.51,36.619s-.006.01-.01.015a.47.47,0,0,0-.09.134l0,.008L50.4,41.457a.474.474,0,0,0,.435.66.469.469,0,0,0,.187-.038L55.7,40.072l.008,0a.459.459,0,0,0,.134-.09s.01-.006.015-.01L72.171,23.657l3.119-3.119A2.369,2.369,0,0,0,75.282,17.2ZM51.735,40.743,53,37.785l1.69,1.69Zm3.79-1.78-2.01-2.01L69.157,21.312l2.01,2.01ZM71.836,22.652l-2.01-2.01.774-.774,2.01,2.01Zm2.784-2.782h0l-1.34,1.34L71.27,19.2l1.34-1.338a1.421,1.421,0,1,1,2.01,2.01Z"
                                    transform="translate(-47.518 -15.586)"
                                />
                                <path
                                    className={props.className || "report"}
                                    d="M78.992,75.818H67.622a.474.474,0,0,0,0,.948H78.992a.474.474,0,0,0,0-.948Z"
                                    transform="translate(-63.358 -71.554)"
                                />
                                <path
                                    className={props.className || "report"}
                                    d="M79.466,126.653a.474.474,0,0,0-.474-.474H67.622a.474.474,0,0,0,0,.948H78.992A.474.474,0,0,0,79.466,126.653Z"
                                    transform="translate(-63.358 -119.072)"
                                />
                                <path
                                    className={props.className || "report"}
                                    d="M67.622,176.539a.474.474,0,0,0,0,.948H76.15a.474.474,0,1,0,0-.948Z"
                                    transform="translate(-63.358 -166.59)"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'marketing':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 29.869 25.009">
                    {
                        !props.className ?
                            <defs>
                                <style>
                                    {
                                        ".marketing{fill:none;stroke:#171717;stroke-linecap:round;stroke-linejoin:round;}"
                                    }
                                </style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-341.571 -1895.496)">
                        <g transform="translate(344.585 1896.114)">
                            <path
                                className={props.className || "marketing"}
                                d="M384.285,1906.8c0,5.9-1.407,10.686-3.143,10.686S378,1912.7,378,1906.8s1.407-10.685,3.143-10.685S384.285,1900.9,384.285,1906.8Z"
                                transform="translate(-357.93 -1896.114)"
                            />
                            <line
                                className={props.className || "marketing"}
                                x1={21.955}
                                y2={6.286}
                                transform="translate(1.257 0)"
                            />
                            <line
                                className={props.className || "marketing"}
                                x1={21.955}
                                y1={6.286}
                                transform="translate(1.257 15.086)"
                            />
                            <path
                                className={props.className || "marketing"}
                                d="M347.328,1914.914c-.695,0-1.257-1.97-1.257-4.4s.563-4.4,1.257-4.4"
                                transform="translate(-346.071 -1899.828)"
                            />
                            <path
                                className={props.className || "marketing"}
                                d="M378.2,1908.242a3.144,3.144,0,0,1,.005,6.124"
                                transform="translate(-358.004 -1900.619)"
                            />
                        </g>
                        <path
                            className={props.className || "marketing"}
                            d="M344.5,1914.367a3.143,3.143,0,0,1,0-6.123"
                            transform="translate(0 -4.505)"
                        />
                        <path
                            className={props.className || "marketing"}
                            d="M363.871,1925.1v3.771a.9.9,0,0,1-1.209.911l-6.383-1.823a1.77,1.77,0,0,1-1.209-1.6v-3.771"
                            transform="translate(-4.828 -9.834)"
                        />
                    </g>
                </svg>
            );
        case 'workers':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 26.655 26.655">
                    {
                        !props.className ?
                            <defs>
                                <style>{".workers{fill:#171717;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(-1103.889 -70.487)">
                        <path
                            className={props.className || "workers"}
                            d="M38.038,68.5A8.546,8.546,0,0,0,29.5,77.038a.625.625,0,0,0,.625.625H45.951a.625.625,0,0,0,.625-.625A8.546,8.546,0,0,0,38.038,68.5Zm-7.264,7.913a7.289,7.289,0,0,1,14.523,0Z"
                            transform="translate(1074.389 19.48)"
                        />
                        <path
                            className={props.className || "workers"}
                            d="M43.873,53.246A4.373,4.373,0,1,0,39.5,48.873,4.373,4.373,0,0,0,43.873,53.246Zm0-7.5a3.124,3.124,0,1,1-3.124,3.124A3.124,3.124,0,0,1,43.873,45.749Z"
                            transform="translate(1068.554 33.484)"
                        />
                        <path
                            className={props.className || "workers"}
                            d="M68.162,51.5a8.621,8.621,0,0,0-3.278.625.625.625,0,1,0,.471,1.158,7.38,7.38,0,0,1,2.807-.533A7.051,7.051,0,0,1,75.3,59h-9.9a.625.625,0,0,0,0,1.249H75.95a.625.625,0,0,0,.625-.625A8.281,8.281,0,0,0,68.162,51.5Z"
                            transform="translate(1053.969 29.4)"
                        />
                        <path
                            className={props.className || "workers"}
                            d="M66.873,35.246A4.373,4.373,0,1,0,62.5,30.873,4.373,4.373,0,0,0,66.873,35.246Zm0-7.5a3.124,3.124,0,1,1-3.124,3.124A3.124,3.124,0,0,1,66.873,27.749Z"
                            transform="translate(1055.132 43.987)"
                        />
                    </g>
                </svg>
            );
        case 'order':
            return (
                <svg width={props.height || 26.665} height={props.height || 25.655} viewBox="0 0 18.378 24.863">
                    {
                        !props.className ?
                            <defs>
                                <style>{".order{fill:#171717;stroke:#171717;stroke-width:0.5px;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <path
                        className={props.className || "order"}
                        d="M13.655,958.9c-.252,0-.5.028-.784.056a3.611,3.611,0,0,0-2.576,1.932h0c-1.6,3.5-1.064,8.679,1.624,13.523h-.028l.224.364c2.856,4.928,7.2,8.119,11.115,8.483h0A3.636,3.636,0,0,0,26.2,982a4.04,4.04,0,0,0,.952-2.828v-.084l-.056-.056c-.756-.924-3.108-3.108-3.108-3.108l-.028-.028-.056-.028a1,1,0,0,0-.84.056l-.952.56a2.131,2.131,0,0,1-1.4.364,1.95,1.95,0,0,1-1.092-.672,21.147,21.147,0,0,1-2.968-4.032,21.854,21.854,0,0,1-2.016-4.592,2.034,2.034,0,0,1-.028-1.288,2.154,2.154,0,0,1,1.008-1.008l.98-.56a.979.979,0,0,0,.476-.7v-.112s-.728-3.108-1.148-4.228l-.028-.084-.056-.056a4.21,4.21,0,0,0-2.184-.616Zm-.028.476a3.675,3.675,0,0,1,1.876.56c.364,1.036,1.064,3.892,1.092,4a.4.4,0,0,1-.224.336l-.98.56a2.535,2.535,0,0,0-1.232,1.26,2.407,2.407,0,0,0,.028,1.6,22.819,22.819,0,0,0,2.044,4.7,22.343,22.343,0,0,0,3.052,4.144,2.44,2.44,0,0,0,1.372.812,2.617,2.617,0,0,0,1.708-.42l.98-.56a.348.348,0,0,1,.364-.028c.056.056,2.212,2.1,2.94,2.94a3.712,3.712,0,0,1-.812,2.436,3.05,3.05,0,0,1-2.576,1.092h0c-3.7-.364-7.951-3.444-10.723-8.259S9.2,964.528,10.743,961.14h0a3.113,3.113,0,0,1,2.24-1.68,1.248,1.248,0,0,1,.644-.084Z"
                        transform="translate(-9.029 -958.65)"
                    />
                </svg>
            );
        case 'tree-arrow-down':
            return (
                <svg width={props.width || 12.193} height={props.height || 6.99} viewBox="0 0 12.193 6.99">
                    {
                        !props.className ?
                            <defs>
                                <style>{".tree-arrow-down{fill:#3b3b3b;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(2.312 6.991) rotate(-90)">
                        <g transform="translate(0 -2.312)">
                            <g transform="translate(0 0)">
                                <path
                                    className={props.className || "tree-arrow-down"}
                                    d="M25.832,12.033l-5.594-5.4a.7.7,0,0,1,0-1.007l5.594-5.4a.7.7,0,0,1,1.182.5v10.8a.7.7,0,0,1-1.182.5Z"
                                    transform="translate(-20.023 -0.033)"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'tree-arrow-right':
            return (
                <svg width={props.width || 6.99} height={props.height || 12.193} viewBox="0 0 6.991 12.193">
                    {
                        !props.className ?
                            <defs>
                                <style>{".tree-arrow-right{fill:#3b3b3b;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(6.991 9.881) rotate(180)">
                        <g transform="translate(0 -2.312)">
                            <g transform="translate(0 0)">
                                <path
                                    className={props.className || "tree-arrow-right"}
                                    d="M25.832,12.033l-5.594-5.4a.7.7,0,0,1,0-1.007l5.594-5.4a.7.7,0,0,1,1.182.5v10.8a.7.7,0,0,1-1.182.5Z"
                                    transform="translate(-20.023 -0.033)"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'tree-arrow-right-empty':
            return (
                <svg width={props.width || 6.99} height={props.height || 12.193} viewBox="0 0 7.99 13.225">
                    {
                        !props.className ?
                            <defs>
                                <style>{".tree-arrow-right-empty{fill:none;stroke:#3b3b3b;}"}</style>
                            </defs>
                            :
                            null
                    }
                    <g transform="translate(7.491 10.397) rotate(180)">
                        <g transform="translate(0 -2.312)">
                            <g transform="translate(0 0)">
                                <path
                                    className={props.className || "tree-arrow-right-empty"}
                                    d="M25.832,12.033l-5.594-5.4a.7.7,0,0,1,0-1.007l5.594-5.4a.7.7,0,0,1,1.182.5v10.8a.7.7,0,0,1-1.182.5Z"
                                    transform="translate(-20.023 -0.033)"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );
        default:
            return null
    }
};

export default Icons;