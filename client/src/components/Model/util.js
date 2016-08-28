export function computeCytoscapeGraph(kerasGraph) {
    return kerasGraph.class_name === 'Model' ?
        getModelCytoscapeGraph(kerasGraph) :
        getSequentialCytoscapeGraph(kerasGraph)
}


export function getModelCytoscapeGraph(kerasGraph) {
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
            links.concat(
                layer.inbound_nodes.map(
                    (inboundNode) => ({
                        data: {
                            id: layer.name + '-' + inboundNode[0][0],
                            source: inboundNode[0][0],
                            target: layer.name
                        }
                    })
                )
            )
        ), [])
    )
}

export function getSequentialCytoscapeGraph(kerasGraph) {
    console.log(kerasGraph)
    return [].concat(
        /**
         * Nodes
         */
        kerasGraph.config.map(
            (layer) => ({
                data: {
                    id: layer.config.name,
                    data: layer
                }
            })
        )
    ).concat(
        /**
         * Links
         */
        kerasGraph.config.reduce((linksData, layer) => (
            {
                links: linksData.links.concat(
                    linksData.lastNodeId ?
                    [
                        {
                            data: {
                                id: layer.config.name + '-' + linksData.lastNodeId,
                                source: linksData.lastNodeId,
                                target: layer.config.name
                            }
                        }
                    ] : []
                ),
                lastNodeId: layer.config.name
            }
        ), {
            links: [],
            lastNodeId: ''
        }).links
    )

}
