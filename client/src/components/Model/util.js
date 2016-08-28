export function computeCytoscapeGraph(kerasGraph) {
    return [].concat(
        /**
         * Nodes
         */
        kerasGraph.config.layers.map(
            (layer) => ({
                data: {
                    id: layer.name,
                    data: layer
                }
            })
        )
    ).concat(
        /**
         * Links
         */
        kerasGraph.config.layers.reduce((links, layer) => (
            links.concat(layer.inbound_nodes.map((inboundNode) => ({
                data: {
                    id: layer.name + '-' + inboundNode[0][0],
                    source: inboundNode[0][0],
                    target: layer.name
                }
            })))
        ), [])
    )
}
