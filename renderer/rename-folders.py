import sys
data=""
for line in sys.stdin:
	data+=line.rstrip()
print(data)
sys.stdout.flush()