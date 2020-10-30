export default {
  bind(elem, binding) {
    M.Tooltip.init(elem, 
      { 
        html: binding.value.value, 
        position: 
          (!binding.value.pos 
            ? 'bottom' 
            : binding.value.pos
          ) 
      });
  },
  unbind(elem) {
    const toolotip = M.Tooltip.getInstance(elem);
    if (toolotip && toolotip.destroy) {
      toolotip.destroy();
    }
  }
}