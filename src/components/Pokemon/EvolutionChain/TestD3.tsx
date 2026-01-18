"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function EvolutionTree({
    data,
    pokemonIdActual,
    types,
}: {
    data: any;
    pokemonIdActual: number;
    types: { colorType1: string; colorType2: string };
}) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(800);

    // 🔁 Detecta resize (RESPONSIVE REAL)
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        if (!svgRef.current || !width) return;

        const isMobile = width < 640;

        const nodeSize = isMobile ? 90 : 120;
        const verticalGap = isMobile ? 110 : 160;
        const horizontalGap = isMobile ? 120 : 200;

        const root = d3.hierarchy(data);
        const tree = d3.tree().nodeSize([horizontalGap, verticalGap]);

        tree(root);

        const height = root.height * verticalGap + 200;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg
            .attr("viewBox", [-width / 2, -40, width, height])
            .append("g");

        const linkGenerator = d3
            .linkVertical<any, d3.HierarchyLink<any>>()
            .x((d: any) => d.x)
            .y((d: any) => d.y);

        g.append("g")
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("fill", "none")
            .attr("stroke", "#444")
            .attr("stroke-width", 1.5)
            .attr("d", linkGenerator);

        const node = g
            .append("g")
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

        node.append("foreignObject")
            .attr("x", -nodeSize / 2)
            .attr("y", 0)
            .attr("width", nodeSize)
            .attr("height", nodeSize + 40)
            .append("xhtml:div")
            .style("display", "flex")
            .style("flexDirection", "column")
            .style("alignItems", "center")
            .style("pointerEvents", "auto")
            .html((d: any) => {
                const current = d.data.id === pokemonIdActual;

                return `
                <a href="/pokemon/${d.data.id}" style="text-decoration:none; 
                display:flex; 
                flex-direction: column;
                align-items: center;"
                >
                    <div style="
                        display:flex; 
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;"
                    ">
                        <div style="
                            border-radius: 100%;
                            padding:${isMobile ? 8 : 12}px;
                        ">
                            <img
                                src="${d.data.image}"
                                width="${isMobile ? 60 : 120}"
                                height="${isMobile ? 60 : 120}"
                                style="display:block"
                            />
                        </div>

                        <span style="
                            position:absolute;
                            top:-6px;
                            right:-6px;
                            background:#111;
                            border:1px solid #333;
                            color:#aaa;
                            font-size:10px;
                            padding:2px 6px;
                            border-radius:9999px;
                            font-weight:bold;
                        ">
                            #${String(d.data.id).padStart(3, "0")}
                        </span>
                    </div>

                    <span style="
                        display:block;
                        margin-top:6px;
                        text-align:center;
                        font-size:${isMobile ? 10 : 12}px;
                        font-weight:600;
                        color:#aaa;
                        text-transform:capitalize;
                        max-width:${nodeSize}px;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                    ">
                        ${d.data.species_name}
                    </span>
                </a>
                `;
            });
    }, [data, pokemonIdActual, types, width]);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                overflowX: "auto",
                overflowY: "hidden",
            }}
        >
            <svg
                ref={svgRef}
                style={{
                    minWidth: "600px",
                    width: "100%",
                    height: "700px",
                }}
            />
        </div>
    );
}
