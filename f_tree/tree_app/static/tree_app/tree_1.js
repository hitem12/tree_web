 //(function() {

	$(document).ready(function(){
    

	
   //var tab = $("#person").text();    
   var tab = [];
   var tab_href =[];

   $("table#table_tree tr").each(function(){
	    var arrayOfThisRow = [];
		var arrayOfThisRow_href = [];
		var tableData = $(this).find('td');
		var href_array = $(this).find('a');

	//	if (tableData.length > 0) {
        tableData.each(function() {
				arrayOfThisRow.push($(this).text());
				$(this).find('a').each(function(){ arrayOfThisRow_href.push($(this).attr("href")); });
				});
		
        tab.push(arrayOfThisRow);
		tab_href.push(arrayOfThisRow_href);
		
   });
    console.log(tab);
	var x = 800;
	var y = 300;
	var graph = new joint.dia.Graph;
	var paper = new joint.dia.Paper({ el: $('#tree'), width: x, height: y, gridSize: 1, model: graph });

    // Create a custom element.
    // ------------------------


    var ElementLink = joint.dia.Element.define('custom.ElementLink', {
        attrs: {
            rect: {
                refWidth: '100%',
                refHeight: '100%',
                strokeWidth: 5
            },
            text: {
                refX: '50%',
                refY: '20%',
                xAlignment: 'middle',
                yAlignment: 'middle',
                fill: '#FFFFFF'
            },
            a: {
            //    xlinkShow: 'new',
                cursor: 'pointer'
            }
        }
    });

    var ElementLinkView = joint.dia.ElementView.extend({
        events: {
            'touchstart a': 'onAnchorTouchStart'
        },
        onAnchorTouchStart: function(evt) {
            // Make sure the default action (opening an <a> tag) is not prevented on touch devices
            evt.stopPropagation();
        }
    });

    // Create JointJS elements and add them to the graph as usual.
    // -----------------------------------------------------------

    // The following custom shape creates a link out of the whole element.
	
	
	
	var this_person = new ElementLink({
	        markup: '<rect/><text/>',
        attrs: {

            text: {
                text: tab[1][0]
            },
            rect: {
                fill: '#E67E22',
                stroke: '#D35400'
            }
	
			}
	});
	var spouse =[];
	for (i=1; i < tab[1].length; i++ )
	{
		spouse.push(new ElementLink({
		 markup: '<a><rect/><text/></a>',
        attrs: {
            a: {
                xlinkHref: tab_href[1][i-1]
            },
            text: {
                text: tab[1][i]
            },
            rect: {
                fill: '#E67E22',
                stroke: '#D35400'
            }
        }
			
		}));
		/*
		link_children.push(new joint.dia.Link({
			attrs: {
				'.connection': {
					strokeWidth: 5,
					stroke: '#34495E'
            }
        }
    }));
		*/
	}
	
	
	var children = [];
	var link_children = [];
	
	for (i=0; i < tab[2].length; i++ )
	{
		children.push(new ElementLink({
		 markup: '<a><rect/><text/></a>',
        attrs: {
            a: {
                xlinkHref: tab_href[2][i]
            },
            text: {
                text: tab[2][i]
            },
            rect: {
                fill: '#E67E22',
                stroke: '#D35400'
            }
        }
			
		}));
		
		link_children.push(new joint.dia.Link({
			attrs: {
				'.connection': {
					strokeWidth: 5,
					stroke: '#34495E'
            }
        }
    }));
	}
	
	var rect_parents = [];
	var link_rect_parents = [];
	for (i=0; i < tab[0].length; i++ )
	{
    rect_parents.push(new ElementLink({
        // Note the `<a>` SVG element surrounding the entire markup.
        markup: '<a><rect/><text/></a>',
        attrs: {
            a: {
                xlinkHref: tab_href[0][i]
            },
            text: {
                text: tab[0][i]
            },
            rect: {
                fill: '#E67E33',
                stroke: '#D35400'
            }
        }
		}));
	link_rect_parents.push(new joint.dia.Link({
        attrs: {
            '.connection': {
                strokeWidth: 5,
                stroke: '#34495E'
            }
        }
		}));
	
	
	}
    // The following custom shape creates a link only out of the label inside the element.
    /*
	var element2 = new ElementLink({
        // Note the `<a>` SVG element surrounding only the text markup.
        markup: '<a><rect/><text/></a>',
        attrs: {
            a: {
                xlinkHref: tab_href[0][1]
            },
            text: {
                text: tab[0][1]
            },
            rect: {
                fill: '#9B59B6',
                stroke: '#8E44AD'
            }
        }
    });
	
    var link = new joint.dia.Link({
        attrs: {
            '.connection': {
                strokeWidth: 5,
                stroke: '#34495E'
            }
        }
    });
	var link2 = new joint.dia.Link({
        attrs: {
            '.connection': {
                strokeWidth: 5,
                stroke: '#34495E'
            }
        }
    });
*/

    var paper = new joint.dia.Paper({
        el: document.getElementById('paper-hyperlinks'),
        width: 650,
        height: 400,
        elementView: ElementLinkView
    });
	
	var x_size = x/5;
	var y_size = y/7;
    paper.model.addCells([
     //   rect_parents[0].position(x/4, y/4).size(x_size, y_size),
     //   rect_parents[1].position(3*x/4, y/4).size(x_size, y_size),
		this_person.position(x/2 - x_size/2, y/2).size(x_size, y_size),
        //link_rect_parents[0].set('source', { id: element1.id }).set('target', { id: this_person.id }),
		//link_rect_parents[1].set('source', { id: element2.id }).set('target', { id: this_person.id }),
    ]);
	
	for (i=0; i < tab[0].length; i++ ){
		paper.model.addCells([
			rect_parents[i].position(x/2+(i%2-1)*x_size, y/4).size(x_size, y_size),
			link_rect_parents[i].set('source', { id: rect_parents[i].id }).set('target', { id: this_person.id }),
		]);
	
	}
	
	for (i=1; i < tab[1].length; i++ ){
		paper.model.addCells([
			spouse[i-1].position(x/2 + (i-0.5)*x_size, y/2+1/5*y_size).size(x_size, y_size),
			//link_rect_parents[i].set('source', { id: rect_parents[i].id }).set('target', { id: this_person.id }),
		]);
	
	}
	
	for (i=0; i < tab[2].length; i++ ){
		paper.model.addCells([
			//children[i].position(i*(x_size+10), 3*y/4).size(x_size, y_size),
			children[i].position(x/2 + (2*((i+1)%2)-1)*(i%2+i)/2* x_size, 3*y/4).size(x_size, y_size),
			link_children[i].set('source', { id: this_person.id }).set('target', { id: children[i].id }),
			]);
	}	
	
	graph.addCells([this_person]);
	graph.addCells(rect_parents);
	graph.addCells(spouse);
	graph.addCells(link_rect_parents);
	graph.addCells(children);
	graph.addCells(link_children);
	 
}());
 

 /*
 var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#info'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
    });

    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    var rect2 = rect.clone();
    rect2.translate(300);

    var link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });
*/
	//graph.addCells([rect, rect2, link]);