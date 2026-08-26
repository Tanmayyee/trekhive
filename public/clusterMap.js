maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.BRIGHT,
    center: [-103.59179687498357, 40.66995747013945],
    zoom: 3
});

map.on('load', function () {

    // ==============================
    // SOURCE
    // ==============================

    map.addSource('listings', {
        type: 'geojson',
        data: listings,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });


    // ==============================
    // CLUSTERS
    // ==============================

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'listings',
        filter: ['has', 'point_count'],

        paint: {
    'circle-color': [
        'step',
        ['get', 'point_count'],
        '#00BCD4',
        10,
        '#2196F3',
        30,
        '#3F51B5'
    ],

    'circle-radius': [
        'step',
        ['get', 'point_count'],
        12,
        10,
        16,
        30,
        20
    ],

    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
}
    });


    // ==============================
    // CLUSTER COUNT
    // ==============================

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'listings',
        filter: ['has', 'point_count'],

        layout: {
            'text-field': '{point_count_abbreviated}',

            'text-font': [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Bold'
            ],

            'text-size': 12
        },

        paint: {
            'text-color': '#ffffff'
        }
    });


    // ==============================
    // LOCATION PIN
    // ==============================

    const pinSvg = `
        <svg width="32" height="40"
             viewBox="0 0 32 40"
             xmlns="http://www.w3.org/2000/svg">

            <path
                d="M16 1C8.3 1 2 7.3 2 15
                   C2 25.5 16 38 16 38
                   C16 38 30 25.5 30 15
                   C30 7.3 23.7 1 16 1Z"
                fill="#E11D48"
                stroke="white"
                stroke-width="2"
            />

            <circle
                cx="16"
                cy="15"
                r="5"
                fill="white"
            />

        </svg>
    `;


    const pinImage = new Image(32, 40);


    pinImage.onload = () => {

        map.addImage('trek-location-pin', pinImage);


        map.addLayer({
            id: 'unclustered-point',
            type: 'symbol',
            source: 'listings',

            filter: ['!', ['has', 'point_count']],

            layout: {
                'icon-image': 'trek-location-pin',
                'icon-size': 0.8,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': true
            }
        });


        // ==============================
        // SINGLE TREK CLICK
        // ==============================

// ==============================
// SINGLE TREK CLICK
// ==============================

map.on('click', 'unclustered-point', function (e) {

    const feature = e.features[0];

    const coordinates =
        feature.geometry.coordinates.slice();

    const title =
        feature.properties.title || 'Trek';

    const location =
        feature.properties.location || '';

    const url =
        feature.properties.url || '#';


    // Handle world map wrapping
    while (
        Math.abs(e.lngLat.lng - coordinates[0]) > 180
    ) {
        coordinates[0] +=
            e.lngLat.lng > coordinates[0]
                ? 360
                : -360;
    }


    // ==============================
    // COMPACT POPUP
    // ==============================

    const popupContent = `

        <div class="w-40 p-0">

            <a
                href="${url}"
                class="
    block
    px-2.5
    py-2
    rounded-lg
    bg-slate-50
    hover:bg-slate-100
    transition-colors
"
            >

                <p class="
                    font-bold
                    text-slate-900
                    text-sm
                    leading-tight
                    line-clamp-2
                ">
                    ${title}
                </p>

                <p class="
                    text-[11px]
                    text-slate-500
                    mt-1
                    truncate
                ">
                    ${location}
                </p>

            </a>

        </div>

    `;


    // ==============================
    // ZOOM
    // ==============================

    map.easeTo({
        center: coordinates,
        zoom: 12,
        duration: 1200
    });


    // ==============================
    // POPUP
    // ==============================

   new maptilersdk.Popup({
    offset: 18,
    closeButton: true,
    closeOnClick: true,
    maxWidth: '200px'
})
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map);

});


        // ==============================
        // SINGLE PIN CURSOR
        // ==============================

        map.on('mouseenter', 'unclustered-point', () => {

            map.getCanvas().style.cursor = 'pointer';

        });

        map.on('mouseleave', 'unclustered-point', () => {

            map.getCanvas().style.cursor = '';

        });

    };


    pinImage.src =
        'data:image/svg+xml;charset=utf-8,' +
        encodeURIComponent(pinSvg);


    // ==============================
    // CLUSTER CLICK
    // ==============================

    // ==============================
// CLUSTER CLICK
// ==============================

map.on('click', 'clusters', async (e) => {

    const features = map.queryRenderedFeatures(
        e.point,
        {
            layers: ['clusters']
        }
    );

    if (!features.length) return;

    const cluster = features[0];

    const clusterId =
        cluster.properties.cluster_id;

    const coordinates =
        cluster.geometry.coordinates.slice();

    const source =
        map.getSource('listings');


    // ==============================
    // GET TREKS
    // ==============================

    const leaves =
        await source.getClusterLeaves(
            clusterId,
            100,
            0
        );


    // ==============================
    // EXPANSION ZOOM
    // ==============================

    const expansionZoom =
        await source.getClusterExpansionZoom(
            clusterId
        );


    // ==============================
    // WORLD WRAPPING
    // ==============================

    while (
        Math.abs(e.lngLat.lng - coordinates[0]) > 180
    ) {
        coordinates[0] +=
            e.lngLat.lng > coordinates[0]
                ? 360
                : -360;
    }


    // ==============================
    // COMPACT CLUSTER POPUP
    // ==============================

    const popupContent = `

        <div class="w-44 p-0">

            <div class="px-1.5 pb-1.5">

                <h3 class="
                    font-bold
                    text-slate-900
                    text-sm
                    leading-tight
                ">
                    ${leaves.length} Treks
                </h3>

                <p class="
                    text-[10px]
                    text-slate-400
                    mt-0.5
                ">
                    This area
                </p>

            </div>


            <div class="
                space-y-1
                max-h-48
                overflow-y-auto
                pr-0.5
            ">

                ${leaves.map((trek) => {

                    const title =
                        trek.properties.title ||
                        'Trek';

                    const location =
                        trek.properties.location ||
                        '';

                    const url =
                        trek.properties.url ||
                        '#';

                    return `

                        <a
                            href="${url}"
                            class="
                                block
                                px-2.5
                                py-2
                                rounded-lg
                                bg-slate-50
                                hover:bg-slate-100
                                transition-colors
                            "
                        >

                            <p class="
                                font-semibold
                                text-slate-900
                                text-xs
                                leading-tight
                                line-clamp-2
                            ">
                                ${title}
                            </p>

                            <p class="
                                text-[10px]
                                text-slate-500
                                mt-0.5
                                truncate
                            ">
                                ${location}
                            </p>

                        </a>

                    `;

                }).join('')}

            </div>

        </div>

    `;


    // ==============================
    // ZOOM + POPUP
    // ==============================

    map.easeTo({
        center: coordinates,
        zoom: Math.min(expansionZoom, 12),
        duration: 1200
    });


   new maptilersdk.Popup({
    offset: 18,
    closeButton: true,
    closeOnClick: true,
    maxWidth: '210px'
})
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map);

});

    // ==============================
    // CLUSTER CURSOR
    // ==============================

    map.on('mouseenter', 'clusters', () => {

        map.getCanvas().style.cursor = 'pointer';

    });


    map.on('mouseleave', 'clusters', () => {

        map.getCanvas().style.cursor = '';

    });

});


const style = document.createElement('style');

style.innerHTML = `
    .maplibregl-popup-close-button {
        font-size: 22px !important;
        width: 28px !important;
        height: 28px !important;
        line-height: 24px !important;
        padding: 0 !important;
        right: 3px !important;
        top: 3px !important;
    }

    .maplibregl-popup-content {
        padding: 6px !important;
        border-radius: 12px !important;
    }
`;

document.head.appendChild(style);