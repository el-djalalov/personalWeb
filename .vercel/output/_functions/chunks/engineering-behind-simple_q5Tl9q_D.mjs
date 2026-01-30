import { q as createVNode, F as Fragment, aA as __astro_tag_component__ } from './astro/server_BrJBC0vc.mjs';
import 'clsx';

const frontmatter = {
  "title": "The Engineering Behind 'Simple'",
  "description": "A deep dive into Uber's distributed systems architecture - from real-time data syncing with gRPC over QUIC, to spatial matching with H3 hexagonal indexing, to smooth map animations using Kalman filters.",
  "pubDate": "2025-01-18T00:00:00.000Z",
  "author": "Elyor Djalalov",
  "tags": ["System Design", "Distributed Systems", "gRPC", "QUIC", "H3", "Software Engineering"],
  "heroImage": "/images/blog/uber-engineering.jpeg",
  "draft": false
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "the-evolution-of-real-time-data-syncing",
    "text": "The Evolution of Real-Time Data Syncing"
  }, {
    "depth": 2,
    "slug": "the-spatial-matching-problem",
    "text": "The Spatial Matching Problem"
  }, {
    "depth": 3,
    "slug": "the-math-behind-hexagons",
    "text": "The Math Behind Hexagons"
  }, {
    "depth": 2,
    "slug": "the-smoothness-illusion",
    "text": "The Smoothness Illusion"
  }, {
    "depth": 2,
    "slug": "the-pattern",
    "text": "The Pattern"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    em: "em",
    h2: "h2",
    h3: "h3",
    hr: "hr",
    img: "img",
    li: "li",
    ol: "ol",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "When you open Uber, you see a map with moving cars. Simple, right?"
    }), "\n", createVNode(_components.p, {
      children: ["That “simple” interface is actually one of the most complex distributed systems ever built. What fascinates me isn’t the final architecture—it’s ", createVNode(_components.strong, {
        children: "how they got there"
      }), ". Every breakthrough came from hitting a wall that couldn’t be patched around."]
    }), "\n", createVNode(_components.h2, {
      id: "the-evolution-of-real-time-data-syncing",
      children: "The Evolution of Real-Time Data Syncing"
    }), "\n", createVNode(_components.p, {
      children: ["Take data syncing. Early on, apps polled the server every few seconds asking “anything new?” At scale, millions of apps doing this becomes a ", createVNode(_components.strong, {
        children: "self-inflicted DDoS attack"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["So they flipped it—", createVNode(_components.strong, {
        children: "Server-Sent Events"
      }), " let the server push updates instead. Better. But SSE is one-way. The server couldn’t know if critical driver offers actually arrived."]
    }), "\n", createVNode(_components.p, {
      children: ["The real fix? ", createVNode(_components.strong, {
        children: "gRPC over QUIC/HTTP3"
      }), "—true bidirectional streaming where both sides talk simultaneously. The result: ", createVNode(_components.strong, {
        children: "45% faster connections"
      }), "."]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "Traditional Polling    →    SSE (Push)    →    gRPC/QUIC (Bidirectional)"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "     ↓                        ↓                        ↓"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "   O(N×M)               One-way only           True two-way streaming"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "   queries              No delivery            With acknowledgments"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "                        confirmation           45% faster"
          })
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "the-spatial-matching-problem",
      children: "The Spatial Matching Problem"
    }), "\n", createVNode(_components.p, {
      children: ["Consider the matching problem. N riders, M drivers—calculating every possible distance is ", createVNode(_components.strong, {
        children: "O(N×M)"
      }), ". Impossible at scale."]
    }), "\n", createVNode(_components.p, {
      children: ["The trick is ", createVNode(_components.strong, {
        children: "spatial partitioning"
      }), ": divide the world into cells, only check nearby ones."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "/images/blog/h3-hexagonal-grid.jpeg",
        alt: "H3 hexagonal grid spatial partitioning"
      })
    }), "\n", createVNode(_components.p, {
      children: ["But here’s the insight that surprised me—", createVNode(_components.strong, {
        children: "why hexagons instead of squares?"
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Because square corners are ", createVNode(_components.strong, {
        children: "41% farther from center than edges"
      }), " (Corner Bias). Hexagons have uniform neighbor distances. Every neighbor cell is equidistant from the center."]
    }), "\n", createVNode(_components.p, {
      children: ["Uber’s ", createVNode(_components.strong, {
        children: "H3 index"
      }), " now powers:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Dynamic pricing across different locations"
      }), "\n", createVNode(_components.li, {
        children: "ETA calculations"
      }), "\n", createVNode(_components.li, {
        children: "Driver positioning and dispatch optimization"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "the-math-behind-hexagons",
      children: "The Math Behind Hexagons"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "Square Grid:"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "┌───┬───┬───┐"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "│   │ d │   │    d = distance to edge neighbor"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "├───┼───┼───┤    d√2 = distance to corner neighbor (41% farther!)"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "│ d │ X │ d │"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "├───┼───┼───┤"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "│   │ d │   │"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "└───┴───┴───┘"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {})
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "Hexagonal Grid:"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "    ╱╲   ╱╲"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "   ╱  ╲d╱  ╲     All 6 neighbors are equidistant"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  ╱ d  ╲╱ d  ╲   No corner bias"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  ╲    ╱X╲    ╱   Uniform spatial queries"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "   ╲  ╱  ╲  ╱"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "    ╲╱ d  ╲╱"
          })
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "the-smoothness-illusion",
      children: "The Smoothness Illusion"
    }), "\n", createVNode(_components.p, {
      children: ["Then there’s the ", createVNode(_components.strong, {
        children: "smoothness illusion"
      }), ". GPS updates every ~4 seconds. Networks drop packets. Raw data would make cars teleport around the map."]
    }), "\n", createVNode(_components.p, {
      children: "The solution combines two techniques:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Dead Reckoning"
        }), " - Predicting position from speed and heading between GPS updates"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Kalman Filters"
        }), " - Blending prediction and measurement, trusting GPS when strong, prediction when weak"]
      }), "\n"]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      "data-language": "typescript",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#6A737D"
            },
            children: "// Simplified Kalman filter concept"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "interface"
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: " State"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "  position"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " ["
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "number"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "number"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "];"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "  velocity"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " ["
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "number"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "number"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "];"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "  uncertainty"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " number"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ";"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "}"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "function"
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: " update"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "state"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: " State"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "gpsReading"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: " Reading"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ")"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: " State"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#6A737D"
            },
            children: "  // Calculate Kalman gain based on GPS signal strength"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "  const"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " gain"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: " ="
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " state.uncertainty "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "/"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " (state.uncertainty "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "+"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " gpsReading.uncertainty);"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#6A737D"
            },
            children: "  // Blend prediction with measurement"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "  const"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " newPosition"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: " ="
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " ["
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "    state.position["
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "0"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "] "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "+"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " gain "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "*"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " (gpsReading.position["
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "0"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "] "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "-"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " state.position["
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "0"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "]),"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "    state.position["
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "1"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "] "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "+"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " gain "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "*"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " (gpsReading.position["
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "1"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "] "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "-"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " state.position["
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "1"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "])"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "  ];"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "  return"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "    position: newPosition,"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "    velocity: "
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: "estimateVelocity"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "(state, gpsReading),"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "    uncertainty: ("
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "1"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: " -"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " gain) "
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "*"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " state.uncertainty"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "  };"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "}"
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "The Kalman filter essentially asks: “How much should I trust this new GPS reading vs. my prediction?” When GPS signal is strong (low uncertainty), trust the reading. When it’s weak (high uncertainty), trust the prediction."
    }), "\n", createVNode(_components.h2, {
      id: "the-pattern",
      children: "The Pattern"
    }), "\n", createVNode(_components.p, {
      children: "The pattern repeats across every major system at Uber:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Start simple"
        }), " - Polling, square grids, raw GPS"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Hit a fundamental limit"
        }), " - DDoS, O(N×M), teleporting cars"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Rethink entirely"
        }), " - gRPC/QUIC, H3 hexagons, Kalman filters"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "That’s real engineering. Not adding more servers to a broken architecture, but recognizing when the approach itself is the problem."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "The next time you open a “simple” app, remember: years of distributed systems research might be hiding behind that smooth interface."
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: ["Have thoughts on distributed systems or want to discuss engineering patterns? ", createVNode(_components.a, {
          href: "/#contact",
          children: "Let’s connect"
        }), "!"]
      })
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/engineering-behind-simple.mdx";
const file = "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/content/blog/engineering-behind-simple.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/content/blog/engineering-behind-simple.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
