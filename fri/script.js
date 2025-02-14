console.log('hello world');

// example list of items
const items = ['node1', 'node2', 'node3', 'node4'];

// generate a list of nodes
const nodes = items.map(item => ({ data: { id: item } }));

// generate a list of edges
const edges = [
    { data: { id: 'edge1', source: 'node1', target: 'node2' } },
    { data: { id: 'edge2', source: 'node2', target: 'node3' } },
    { data: { id: 'edge3', source: 'node3', target: 'node4' } }
];


// Combine nodes and edges into elements array
const elements = [...nodes, ...edges];

const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: elements,
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
