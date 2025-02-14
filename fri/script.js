console.log('hello world');
const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [
        { data: { id: 'nodefrom' } },
        { data: { id: 'nodeto' } },
        { data: { id: 'edge', source: 'nodefrom', target: 'nodeto' } }
    ],
    layout: {
        name: 'grid',
        rows: 1
    },
    style: [
        {
            selector: 'node',
            style: {
                'label': 'data(id)'
            }
        }
    ]
});
