maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.BRIGHT,
    center: [-103.59179687498357, 40.66995747013945],
    zoom: 3
});

map.on('load', function () {
    map.addSource('listings', {
        type: 'geojson',
        data: listings,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    // Cluster circles
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
                15,
                10,
                20,
                30,
                25
            ]
        }
    });

    // Cluster count
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'listings',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    // Location pin for individual treks
    const pinSvg = `
        <svg width="32" height="40" viewBox="0 0 32 40"
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
    };

    pinImage.src =
        'data:image/svg+xml;charset=utf-8,' +
        encodeURIComponent(pinSvg);


    // Click cluster → zoom into cluster
    map.on('click', 'clusters', async (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });

        const clusterId = features[0].properties.cluster_id;

        const zoom = await map
            .getSource('listings')
            .getClusterExpansionZoom(clusterId);

        map.easeTo({
            center: features[0].geometry.coordinates,
            zoom:12,
            duration:1500
        });
    });


    // Click individual trek
    map.on('click', 'unclustered-point', function (e) {
        const { popUpMarkup } = e.features[0].properties;

        const coordinates =
            e.features[0].geometry.coordinates.slice();

        while (
            Math.abs(e.lngLat.lng - coordinates[0]) > 180
        ) {
            coordinates[0] +=
                e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

         map.easeTo({
           center: coordinates,
           zoom: 12,
           duration:1500
         });

        new maptilersdk.Popup()
            .setLngLat(coordinates)
            .setHTML(popUpMarkup)
            .addTo(map);
    });


    // Cursor for clusters
    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });

});