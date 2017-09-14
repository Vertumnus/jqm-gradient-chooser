/* 
 * Copyright Armin Junge
 */


$.widget('vertumnus.gradientchooser', $.mobile.collapsible, {
   options: {
      actionIcon: 'action',
      colorFrom: '#000000',
      colorTo: '#000000'
   },
   _create: function(){
      let content = `
<div class="ui-grid-b ui-gradient">
   <div class="ui-block-a">
      <a href="#" class="ui-btn ui-corner-all ui-btn-icon-notext ui-icon-carat-r"></a>
   </div>
   <div class="ui-block-b">
      <a href="#" class="ui-btn ui-corner-all ui-btn-icon-notext ui-icon-${this.options.actionIcon}"></a>
   </div>
   <div class="ui-block-c">
      <a href="#" class="ui-btn ui-corner-all ui-btn-icon-notext ui-icon-carat-l"></a>
   </div>
</div>`
      
      this.element.append(content)
      this._super()
      
      // register click event on left button (from)
      this.element.find('.ui-gradient .ui-block-a a').click({ widget: this, cb: 'clickFrom' }, this._click)
      // register click event on right button (to)
      this.element.find('.ui-gradient .ui-block-c a').click({ widget: this, cb: 'clickTo' }, this._click)
      // register click event on action button
      this.element.find('.ui-gradient .ui-block-b a').click({ widget: this, cb: 'apply' }, this._click)
      
      this._colorFrom = this.options.colorFrom
      this._colorTo = this.options.colorTo
   },
   _setOption: function(key, value){
      switch(key){
         case 'actionIcon':
            value = this._replaceActionIcon(value)
            break
         case 'colorFrom':
            this.colorFrom(value)
            break
         case 'colorTo':
            this.colorTo(value)
            break
      }
      this._super(key, value)
   },
   _click: function(event){
      event.data.widget._trigger(event.data.cb, event)
   },
   _replaceActionIcon: function(iconname){
      if(!iconname)
         iconname = 'no'
      let actionButton = this.element.find('.ui-gradient .ui-block-b a')
      actionButton.removeClass(function(index, classname){
         return classname.split(' ').filter(function(value){
            return /ui-icon-.+/.test(value)
         }).toString()
      }).addClass('ui-icon-' + iconname)
      return iconname
   },
   colorFrom: function(color){
      if(color === undefined)
         return this._colorFrom
      if(!this._isColor(color))
         return null
      this._colorFrom = color
      this._setGradient()
   },
   colorTo: function(color){
      if(color === undefined)
         return this._colorTo
      if(!this._isColor(color))
         return null
      this._colorTo = color
      this._setGradient()
   },
   _isColor: function(color){
      return /#[0-9a-fA-F]{6}/.test(color) ||
              /rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/.test(color)
   },
   _setGradient: function(){
      this.element.children('.ui-collapsible-content').css('background-image', `linear-gradient(to right, ${this._colorFrom} 0%, ${this._colorTo} 100%)`)
   }
})