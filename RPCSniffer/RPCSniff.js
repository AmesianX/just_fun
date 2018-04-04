// 
// VMware RPC sniffer 
//
// VMware Workstation 12 Pro 12.5.2 build-4638234
// Guest: Windows 7 x64

var vmware_vmx = Module.findBaseAddress("vmware-vmx.exe");
var execRPCfunc = vmware_vmx.add(0x69220);

console.log("vmware-vmx : " + vmware_vmx.toString(16));
console.log("rpc parser : " + execRPCfunc.toString(16));

Interceptor.attach(execRPCfunc, 
		{
			onEnter: function(args) {
				// read from r8 to r8+r9
				var buffer = this.context.r8;
				var length = this.context.r9.toInt32();
				var data = Memory.readByteArray(buffer, length);

				console.log("===========================================================================");
				console.log("Request length: " + length);
				console.log("Packet: ");
				console.log(data);
				console.log("===========================================================================");
			},

			onLeave: function(retval) {
			},		
		});
		
