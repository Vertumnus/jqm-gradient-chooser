/* 
 * Copyright Armin Junge
 */


function assert(expression, message){
   if(!expression)
      throw new Error(message || 'failed')
}

if(window.__html__)
   $('body').html(window.__html__['test/fixture.auto.html'])

describe('Widget', function(){
   let gradient
   let gridframe
   before(function(){
      gradient = $('#gradient')
      gridframe = gradient.children('.ui-collapsible-content').children()
   })
   context('#Contained elements', function(){
      it('shall have a grid with three buttons', function(){
         assert(gridframe.length === 1, 'Collapsible content contains not only one child')
         assert(gridframe.children().length === 3, 'Grid has not three columns')
         gridframe.children().each(function(index){
            let col = $(this)
            ++index
            let button = col.children()
            assert(button.length === 1, `${index}. column contains not only one child`)
            assert(button.is('a'), `${index}. column has no link button (<a>) as child`)
         })
      })
      it('shall have the correct css classes', function(){
         let gridids = ['a', 'b', 'c']
         assert(gridframe.hasClass('ui-grid-b'), 'Child of collapsible content is not a grid')
         assert(gridframe.hasClass('ui-gradient'), 'The grid has not the special gradient class')
         gridframe.children().each(function(index){
            let col = $(this)
            let gridid = gridids[index++]
            let button = col.children()
            assert(col.hasClass('ui-block-' + gridid), `${index}. column has a wrong block class`)
            assert(button.hasClass('ui-btn'), `${index}. column has not a button`)
         })
      })
   })
   context('#Options and Attributes', function(){
      it('uses the option defaults', function(){
         assert(gradient.find('.ui-gradient .ui-block-b a').hasClass('ui-icon-action'), 'Action button has wrong icon')
         assert(gradient.gradientchooser('colorFrom') === '#000000', 'Color From has wrong default value')
         assert(gradient.gradientchooser('colorTo') === '#000000', 'Color To has wrong default value')
      })
      it('should disable the action icon', function(){
         gradient.gradientchooser('option', 'actionIcon', '')
         assert(gradient.find('.ui-gradient .ui-block-b a').hasClass('ui-icon-no'), 'Action button is not hidden')
      })
      it('should change the action icon', function(){
         gradient.gradientchooser('option', 'actionIcon', 'recycle')
         assert(gradient.find('.ui-gradient .ui-block-b a').hasClass('ui-icon-recycle'), 'Action button got not correct icon')
      })
      it('should change the color from icon', function(){
         gradient.gradientchooser('option', 'fromIcon', 'arrow-r')
         assert(gradient.find('.ui-gradient .ui-block-a a').hasClass('ui-icon-arrow-r'), 'Color from button got not correct icon')
      })
      it('should change the color to icon', function(){
         gradient.gradientchooser('option', 'toIcon', 'arrow-l')
         assert(gradient.find('.ui-gradient .ui-block-c a').hasClass('ui-icon-arrow-l'), 'Color to button got not correct icon')
      })
      it('should change the color from', function(){
         gradient.gradientchooser('option', 'colorFrom', '#ff0000')
         assert(gradient.gradientchooser('colorFrom') === '#ff0000', 'Color From not changed to red')
      })
      it('should change the color to', function(){
         gradient.gradientchooser('option', 'colorTo', 'rgb(0, 0, 255)')
         assert(gradient.gradientchooser('colorTo') === 'rgb(0, 0, 255)', 'Color To not changed to blue')
      })
      it('should not change the color from at wrong color specification', function(){
         gradient.gradientchooser('colorFrom', 'green')
         assert(gradient.gradientchooser('colorFrom') === '#ff0000', 'Color From changed')
      })
      it('should not change the color to at wrong color specification', function(){
         gradient.gradientchooser('colorTo', 'green')
         assert(gradient.gradientchooser('colorTo') === 'rgb(0, 0, 255)', 'Color To changed')
      })
   })
   context('#Events', function(){
      let fromClicked, toClicked, applied
      before(function(){
         gradient.gradientchooser('option', {
            clickFrom: function(){
               fromClicked = true
            },
            clickTo: function(){
               toClicked = true
            },
            apply: function(){
               applied = true
            }
         })
      })
      it('should trigger clickFrom', function(){
         gradient.find('.ui-block-a a').click()
         assert(fromClicked, 'From button was not clicked')
      })
      it('should trigger clickTo', function(){
         gradient.find('.ui-block-c a').click()
         assert(toClicked, 'To button was not clicked')
      })
      it('should trigger apply', function(){
         gradient.find('.ui-block-b a').click()
         assert(applied, 'Action button was not clicked')
      })
   })
})